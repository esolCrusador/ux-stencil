import { UserInfoModel } from "../../auth/models/user-info.model";
import { IAddressModel } from "../../common/models/i-address.model";
import { ILastOrderModel } from "./i-last-order.model";
import { IUserModel } from "./i-user.model";

export class UserModel implements IUserModel {
    public readonly userId: number;
    public readonly username: string;
    public readonly email: string;
    public readonly fullName: string;
    public readonly avatarUrl: string;
    public readonly instargam: string;
    public readonly phoneNumber: string;
    public readonly addresses: IAddressModel[];
    public readonly lastOrder: ILastOrderModel;

    constructor(
        user: IUserModel | UserInfoModel
    ) {
        if (user instanceof UserInfoModel) {
            this.userId = user.userId;
            this.username = user.username;
            this.email = user.email;
            this.fullName = user.name;
            this.avatarUrl = user.avatarUrl;
            this.instargam = null;
            this.phoneNumber = null;
            this.addresses = [];
            this.lastOrder = null;
        } else {
            this.userId = user.userId;
            this.username = user.username;
            this.email = user.email;
            this.fullName = user.fullName;
            this.avatarUrl = user.avatarUrl;
            this.instargam = user.instargam;
            this.phoneNumber = user.phoneNumber;
            this.addresses = user.addresses;
            this.lastOrder = user.lastOrder;
        }
    }
}