import { Injectable } from '@angular/core';
import { IAuthProvider } from './i-auth.provider';
import { AuthProviderType } from './auth-provider-type.enum';
import { forkJoin, Observable, of } from 'rxjs';
import { AuthApiClient } from '../api-clients/auth.api-client';
import { tap, switchMap, concatMap } from 'rxjs/operators';
import { BrowserInfoService } from '@ux-stencil/infrastructure/browser-info/browser-info.service';
import { ScriptLoaderService } from '@ux-stencil/common/services/script-loader.service';
import { ILogger } from '@ux-stencil/logging/i-logger';
import { ConfigurationService } from '@ux-stencil/configuration/configuration.service';

declare var FB: facebook.FacebookStatic & { getAccessToken: () => string };

@Injectable()
export class FacebookAuthProvider extends IAuthProvider {
    public readonly providerType: AuthProviderType = AuthProviderType.Facebook;

    constructor(
        authApiClient: AuthApiClient,
        browserInfoService: BrowserInfoService,
        scriptLoader: ScriptLoaderService,
        logger: ILogger,
        private readonly configurationService: ConfigurationService,
    ) {
        super(authApiClient, browserInfoService, scriptLoader, logger);
    }

    public load(): Observable<void> {
        return forkJoin([
            this.scriptLoader.loadScript('facebook-auth', 'https://connect.facebook.net/en_US/sdk.js'),
            this.configurationService.getFacebookClientId$()
        ]).pipe(
            tap(([, facebookClientId]) => {
                FB.init({
                    appId: facebookClientId,
                    autoLogAppEvents: true,
                    status: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v6.0'
                });
            }),
            concatMap(() => {
                return new Observable<void>(observer => {
                    FB.getLoginStatus(() => {
                        observer.next();
                        observer.complete();
                    });
                });
            })
        );
    }

    public signin(): Observable<void> {
        if (!this.isInitialized || !this.isSupportedBrowser())
            return this.fallbackLogin();

        return this.getAccessToken().pipe(
            switchMap(accessToken => this.finishAuthentication(accessToken)),
        );
    }

    public signout(): void {
        if (!this.isInitialized)
            return;

        if (!!FB.getAccessToken()) {
            FB.logout();
            this.logger.debug('Logged out from Facebook');
        }
    }

    private getAccessToken(): Observable<string> {
        const token = FB.getAccessToken();
        if (token)
            return of(token);

        return new Observable<string>(observer => {
            FB.login(response => {
                if (response.status === 'connected') {
                    observer.next(response.authResponse.accessToken);
                    observer.complete();
                } else {
                    observer.error(response.status);
                }
            });
        });
    }
}
