import { AuthProviderType } from './auth-provider-type.enum';
import { Observable, of } from 'rxjs';
import { AuthApiClient } from '../api-clients/auth.api-client';
import { publishReplay, refCount, catchError, tap } from 'rxjs/operators';
import { BrowserInfoService } from '../../infrastructure/browser-info/browser-info.service';
import { ScriptLoaderService } from '../../common/services/script-loader.service';
import { BrowserType } from '../../infrastructure/models/browser-type.enum';
import { ILogger } from '../../logging/i-logger';

export abstract class IAuthProvider {
    private static readonly SupportedBrowserTypes = [BrowserType.Chrome, BrowserType.Safari, BrowserType.Edge, BrowserType.Firefox, BrowserType.Opera];

    protected isInitialized: boolean;
    private load$: Observable<void>;

    public readonly abstract providerType: AuthProviderType;

    constructor(
        private readonly authApiClient: AuthApiClient,
        private readonly browserInfoService: BrowserInfoService,
        protected readonly scriptLoader: ScriptLoaderService,
        protected readonly logger: ILogger,
    ) {
    }

    public initialize(): Observable<void> {
        if (!this.load$) {
            this.load$ = this.load().pipe(
                tap(() => this.isInitialized = true),
                catchError(error => {
                    this.logger.error(error);
                    this.isInitialized = false;
                    return of(undefined);
                }),
                publishReplay(1),
                refCount()
            );

            this.load$.subscribe({
                next: () => this.logger.debug(`The script for provider ${this.providerType} is loaded`),
            });
        }

        return this.load$;
    }

    public abstract signin(): Observable<void>;
    public abstract signout(): void;

    protected abstract load(): Observable<void>;

    protected finishAuthentication(token: string): Observable<void> {
        return this.authApiClient.finishAuthentication(this.providerType, token);
    }

    protected fallbackLogin(): Observable<void> {
        this.authApiClient.navigateToLoginUrl(this.providerType);

        return of(undefined);
    }

    protected isSupportedBrowser(): boolean {
        const browserType = this.browserInfoService.browserType;
        return IAuthProvider.SupportedBrowserTypes.some(bt => browserType === bt);
    }
}
