import { Injectable } from "@angular/core";
import { AuthService } from "@ux-stencil/auth/services/auth.service";
import { concat, Observable, of, Subject } from "rxjs";
import { map, mapTo, publishReplay, refCount, switchMap, tap } from "rxjs/operators";
import { IAddressModel } from "../models/i-address.model";
import { AddressApiClient } from "./address.api-client";
import { ChangeType, IChange } from '@ux-stencil/common/models/i-change';
import { IMap } from "@ux-stencil/common/models/i-map";
import { IdName } from "@ux-stencil/common/models/id-name";

@Injectable()
export class AddressService {
    private addresses$: Observable<IAddressModel[]>;
    private countries$: Observable<IdName<string>[]>;
    private countriesMap$: Observable<IMap<string>>;
    private readonly addressChanges$: Subject<IChange<IAddressModel>>;

    constructor(
        private readonly authService$: AuthService,
        private readonly addressApiClient: AddressApiClient,
    ) {
        this.addressChanges$ = new Subject<IChange<IAddressModel>>();
    }

    public getCountries$(): Observable<IdName<string>[]> {
        if (!this.countries$) {
            this.countries$ = this.addressApiClient.getCountries().pipe(
                publishReplay(1),
                refCount()
            );
        }

        return this.countries$;
    }

    public getCountriesMap$(): Observable<IMap<string>> {
        if (!this.countriesMap$) {
            this.countriesMap$ = this.getCountries$().pipe(
                map(countries => countries.reduce(
                    (agg, country) => { agg[country.id] = country.name; return agg; },
                    {} as IMap<string>)
                ),
                publishReplay(1),
                refCount()
            );
        }

        return this.countriesMap$;
    }

    public getCountry$(countryId: number): Observable<string> {
        return this.getCountriesMap$().pipe(
            map(countries => countries[countryId])
        );
    }

    public createOrUpdateAddress(address: IAddressModel): Observable<IAddressModel> {
        if (address.addressId)
            return this.addressApiClient.updateAddress(address).pipe(
                tap(() => this.addressChanges$.next({ type: ChangeType.Updated, value: address })),
                mapTo(address)
            );

        return this.addressApiClient.addAddress(address).pipe(
            tap(a => this.addressChanges$.next({ type: ChangeType.Added, value: a }))
        );
    }

    public deleteAddress(address: IAddressModel): Observable<void> {
        return this.addressApiClient.deleteAddress(address.addressId).pipe(
            tap(() => this.addressChanges$.next({ type: ChangeType.Deleted, value: address }))
        );
    }

    public getAddresses(): Observable<IAddressModel[]> {
        if (!this.addresses$) {
            this.addresses$ = this.authService$.isAuthenticated$().pipe(
                switchMap(isAuthenticated => !isAuthenticated
                    ? []
                    : this.addressApiClient.getAddresses().pipe(
                        switchMap(addresses =>
                            concat(of(null as IChange<IAddressModel>), this.addressChanges$).pipe(
                                map(change => {
                                    if (!change)
                                        return addresses;

                                    switch (change.type) {
                                        case ChangeType.Added:
                                            return [...addresses, change.value];
                                        case ChangeType.Updated:
                                            addresses = [...addresses];
                                            addresses[addresses.findIndex(a => a.addressId === change.value.addressId)] = change.value;
                                            return addresses;
                                        case ChangeType.Deleted:
                                            return addresses.filter(a => a.addressId !== change.value.addressId);
                                        default:
                                            throw new Error(`Not supported ChangeType.${ChangeType[change.type]}`);
                                    }
                                })
                            )
                        )
                    )),
                publishReplay(1),
                refCount()
            );
        }

        return this.addresses$;
    }
}