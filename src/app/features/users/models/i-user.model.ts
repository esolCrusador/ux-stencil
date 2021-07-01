import { IAddressModel } from '../../address/models/i-address.model';
import { ILastOrderModel } from './i-last-order.model';

export interface IUserModel {
    userId: number;
    username: string;
    email: string;
    fullName: string;
    avatarUrl: string;
    instargam: string;
    phoneNumber: string;
    lastOrder: ILastOrderModel;
    addresses: IAddressModel[];
}