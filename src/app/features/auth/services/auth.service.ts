import { Injectable, NgZone } from '@angular/core';
import { AuthApiClient } from '../api-clients/auth.api-client';
import { AuthProviderFactory } from '../providers/auth-provider.factory';
import { CookieService } from '../../infrastructure/cookies/cookie.service';
import { ILogger } from '../../logging/i-logger';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { IAuthProvider } from '../providers/i-auth.provider';
import { AuthProviderType } from '../providers/auth-provider-type.enum';
import { concatMap, distinctUntilChanged, map, mapTo } from 'rxjs/operators';
import { IUserInfoShortModel } from '../models/i-user-info-sort.model';
import { UserInfoModel } from '../models/user-info.model';

@Injectable()
export class AuthService {
  private userInfo$: BehaviorSubject<UserInfoModel>;

  constructor(
    private readonly cookiesService: CookieService,
    private readonly authProviderFactory: AuthProviderFactory,
    private readonly authApiClient: AuthApiClient,
    private readonly logger: ILogger,
    private readonly ngZone: NgZone,
  ) {
    this.userInfo$ = new BehaviorSubject<UserInfoModel>(undefined);
  }

  public getUserInfo(): UserInfoModel {
    const cookie = this.cookiesService.getCookie('Inf');
    if (!cookie) {
      this.userInfo$.next(null);
      return null;
    }

    const formattedJson = cookie.replace(/[{,] *([a-zA-Z]\w*):/g, (str, propName) => {
      return str.replace(propName, `"${propName}"`);
    });

    const info = JSON.parse(formattedJson) as IUserInfoShortModel;

    const model = new UserInfoModel(info);
    this.userInfo$.next(model);

    return model;
  }

  public getUserInfo$(): Observable<UserInfoModel> {
    if (this.userInfo$.value === undefined)
      this.getUserInfo();

    return this.userInfo$;
  }

  public isAuthenticated$(): Observable<boolean> {
    return this.getUserInfo$().pipe(
      map(userInfo => !!userInfo),
      distinctUntilChanged()
    );
  }

  public refreshUserInfo(): Observable<UserInfoModel> {
    return this.authApiClient.refresh().pipe(
      map(() => this.getUserInfo())
    );
  }

  public initializeProviders(): Observable<IAuthProvider[]> {
    return this.authProviderFactory.initializeAll();
  }

  public signin(authProviderType: AuthProviderType): Observable<boolean> {
    const provider = this.authProviderFactory.getProvider(authProviderType);
    const isAuthenticated$ = provider.initialize().pipe(
      concatMap(() => provider.signin()),
      map(() => !!this.getUserInfo())
    );

    return new Observable<boolean>(observer$ => {
      return isAuthenticated$.subscribe({
        next: result => this.ngZone.run(() => observer$.next(result)),
        error: error => this.ngZone.run(() => observer$.error(error)),
        complete: () => this.ngZone.run(() => observer$.complete())
      });
    });
  }

  public signout(): Observable<void> {
    return forkJoin([
      this.authProviderFactory.initializeAll().pipe(
        map(providers => {
          for (const provider of providers) {
            try {
              provider.signout();
            } catch (error) {
              this.logger.error(error);
            }
          }
        })
      ),
      this.authApiClient.signout()
    ]).pipe(mapTo(undefined));
  }

  public delete(): Observable<void> {
    return this.authApiClient.delete();
  }
}
