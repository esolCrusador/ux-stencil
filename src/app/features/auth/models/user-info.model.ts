import { IUserInfoShortModel } from './i-user-info-sort.model';

export class UserInfoModel {
    public readonly userId: number;
    public readonly email: string;
    public readonly username: string;
    public readonly avatarUrl: string;
    public readonly name: string;
    public readonly loginDate: Date;

    constructor(
        userInfo: IUserInfoShortModel,
    ) {
        this.userId = userInfo.id;
        this.email = userInfo.e;
        this.username = userInfo.un;
        this.avatarUrl = userInfo.av;
        this.name = userInfo.n;
        this.loginDate = new Date(userInfo.d);
    }
}
