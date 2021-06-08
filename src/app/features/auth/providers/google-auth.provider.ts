import { Injectable } from '@angular/core';
import { IAuthProvider } from './i-auth.provider';
import { AuthProviderType } from './auth-provider-type.enum';
import { AuthApiClient } from '../api-clients/auth.api-client';
import { forkJoin, Observable } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { ScriptLoaderService } from '../../common/services/script-loader.service';
import { BrowserInfoService } from '../../infrastructure/browser-info/browser-info.service';
import { ILogger } from '../../logging/i-logger';
import { ConfigurationService } from '../../configuration/configuration.service';

@Injectable()
export class GoogleAuthProvider extends IAuthProvider {
    public readonly providerType: AuthProviderType = AuthProviderType.Google;

    private googleAuth: gapi.auth2.GoogleAuth;

    constructor(
        authApiClient: AuthApiClient,
        browserInfoService: BrowserInfoService,
        scriptLoader: ScriptLoaderService,
        logger: ILogger,
        private readonly configurationService: ConfigurationService,
    ) {
        super(authApiClient, browserInfoService, scriptLoader, logger);
    }

    public signin(): Observable<void> {
        if (!this.isInitialized || !this.isSupportedBrowser())
            return this.fallbackLogin();

        return this.getAccessToken().pipe(
            switchMap(accessToken => this.finishAuthentication(accessToken)),
        );
    }

    public signout(): void {
        if (this.isInitialized)
            this.googleAuth.signOut();
    }

    protected load(): Observable<void> {
        return forkJoin([
            this.scriptLoader.loadScript('google-oauth2', 'https://apis.google.com/js/platform.js'),
            this.configurationService.getGoogleClientId$()
        ]).pipe(
            concatMap(([, googleClientId]) => new Observable<void>(observer =>
                gapi.load('auth2', () => {
                    gapi.auth2.init({
                        scope: 'profile',
                        client_id: googleClientId
                    }).then(
                        googleAuth => {
                            this.googleAuth = googleAuth;
                            observer.next();
                            observer.complete();
                        },
                        error => observer.error(error)
                    );
                })
            ))
        );
    }

    private getAccessToken(): Observable<string> {
        return new Observable<string>(observer => {
            const currentUser = this.googleAuth.currentUser.get();
            if (!!currentUser && currentUser.isSignedIn()) {
                observer.next(currentUser.getAuthResponse(true).id_token);
                observer.complete();
                return;
            }

            this.googleAuth.signIn().then(user => {
                observer.next(user.getAuthResponse(true).id_token);
                observer.complete();
            }).catch(error => observer.error(error));
        });
    }
}
