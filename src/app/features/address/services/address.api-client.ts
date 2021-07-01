import { Injectable } from '@angular/core';
import { IdName } from '@ux-stencil/common/models/id-name';
import { HttpService } from '@ux-stencil/infrastructure/http/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAddressModel } from '../models/i-address.model';

@Injectable()
export class AddressApiClient {
    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    public getCountries(): Observable<IdName<string>[]> {
        return this.httpService.get('/api/address/countries');
    }

    public addAddress(address: IAddressModel): Observable<IAddressModel> {
        return this.httpService.post<number>('/api/address', address).pipe(
            map(addressId => ({ ...address, addressId: addressId }))
        );
    }

    public updateAddress(address: IAddressModel): Observable<void> {
        return this.httpService.put(`/api/address/${address.addressId}`, address);
    }

    public getAddresses(): Observable<IAddressModel[]> {
        return this.httpService.get('/api/address');
    }

    public deleteAddress(addressId: number): Observable<void> {
        return this.httpService.delete(`/api/address/${addressId}`);
    }
}