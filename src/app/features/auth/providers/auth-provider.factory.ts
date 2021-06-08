import { Injectable, Inject } from '@angular/core';
import { IAuthProvider } from './i-auth.provider';
import { AuthProviderType } from './auth-provider-type.enum';
import { Observable, forkJoin } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class AuthProviderFactory {
    private providers: { [providerType in AuthProviderType]: IAuthProvider };

    constructor(
        @Inject(IAuthProvider) providers: IAuthProvider[]
    ) {
        this.providers = providers.reduce(
            (agg, provider) => {
                agg[provider.providerType] = provider;
                return agg;
            },
            {} as { [providerType in AuthProviderType]: IAuthProvider }
        );
    }

    public getProviderTypes(): AuthProviderType[] {
        return Object.keys(this.providers) as AuthProviderType[];
    }

    public initializeAll(): Observable<IAuthProvider[]> {
        const inits = this.getProviderTypes().map(providerKey => {
            const provider = this.getProvider(providerKey);
            return provider.initialize().pipe(mapTo(provider));
        });

        return forkJoin(inits);
    }

    public getProvider(providerType: AuthProviderType): IAuthProvider {
        const provider = this.providers[providerType];
        if (!provider)
            throw new Error(`The Auth Provider of type ${providerType} was not provided.`);

        return provider;
    }
}
