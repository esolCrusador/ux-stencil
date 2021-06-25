import { AddressType } from './address-type.enum';

export interface IAddressModel {
    addressId: number;
    address: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    addressType: AddressType;
}
