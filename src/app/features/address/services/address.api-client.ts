import { Injectable } from '@angular/core';
import { IdName } from '@ux-stencil/common/models/id-name';
import { HttpService } from '@ux-stencil/infrastructure/http/http.service';
import { Observable } from 'rxjs';
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
        return this.httpService.post<IAddressModel>('/api/address', address);
    }

    public updateAddress(address: IAddressModel): Observable<IAddressModel> {
        return this.httpService.put<IAddressModel>(`/api/address/${address.addressId}`, address);
    }

    public getAddresses(): Observable<IAddressModel[]> {
        return this.httpService.get('/api/address');
    }

    public deleteAddress(addressId: number): Observable<void> {
        return this.httpService.delete(`/api/address/${addressId}`);
    }
}
