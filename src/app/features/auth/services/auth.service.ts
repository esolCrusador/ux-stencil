import { Injectable } from "@angular/core";
import { AuthApiClient } from "../api-clients/auth.api-client";
import { AuthProviderFactory } from "../providers/auth-provider.factory";
import { CookieService } from '../../infrastructure/cookies/cookie.service';
import { ILogger } from '../../logging/i-logger';
import { forkJoin, Observable } from "rxjs";
import { IAuthProvider } from "../providers/i-auth.provider";
import { AuthProviderType } from "../providers/auth-provider-type.enum";
import { concatMap, map, mapTo } from "rxjs/operators";

@Injectable()
export class AuthService {

  constructor(
    private readonly cookiesService: CookieService,
    private readonly authProviderFactory: AuthProviderFactory,
    private readonly authApiClient: AuthApiClient,
    private readonly logger: ILogger,
  ) {
  }

  /*
    public getUserInfo(): UserInfoModel {
        const cookie = this.cookiesService.getCookie('Inf');
        if (!cookie)
            return null;

        const formattedJson = cookie.replace(/[{,] *([a-zA-Z]\w*):/g, (str, propName) => {
            return str.replace(propName, `"${propName}"`);
        });

        const info = JSON.parse(formattedJson) as IUserInfoShort;

        return new UserInfoModel(info);
    }

    public refreshUserInfo(): Observable<UserInfoModel> {
        return this.authApiClient.refresh().pipe(
            map(() => this.getUserInfo())
        );
    }
  */  

  public initializeProviders(): Observable<IAuthProvider[]> {
    return this.authProviderFactory.initializeAll();
  }

  public signin(authProviderType: AuthProviderType): Observable<void> {
    const provider = this.authProviderFactory.getProvider(authProviderType);
    return provider.initialize().pipe(concatMap(() => provider.signin()));
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
