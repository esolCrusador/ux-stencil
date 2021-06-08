import { Injectable } from '@angular/core';
import { IAuthProvider } from './i-auth.provider';
import { AuthProviderType } from './auth-provider-type.enum';
import { Observable, of } from 'rxjs';
import { AuthApiClient } from '../api-clients/auth.api-client';
import { BrowserInfoService } from '@share-book/features/infrastructure/browser-info/browser-info.service';
import { ScriptLoaderService } from '@share-book/features/common/services/script-loader.service';
import { ILogger } from '@share-book/features/logging/i-logger';
import { tap, switchMap, concatMap } from 'rxjs/operators';
import { ConfigurationService } from '@share-book/features/shared/domain-services/configuration.service';

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
        return this.scriptLoader.loadScript('facebook-auth', 'https://connect.facebook.net/en_US/sdk.js').pipe(
            tap(() => {
                FB.init({
                    appId: this.configurationService.facebookClientId,
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
