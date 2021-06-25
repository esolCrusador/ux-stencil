import { Injectable } from "@angular/core";
import { concat, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from '../../auth/services/auth.service';
import { UsersApiClient } from "../api-clients/users.api-client";
import { UserModel } from "../models/user.model";

@Injectable()
export class UsersService {
    constructor(
        private readonly authService: AuthService,
        private readonly userApiClient: UsersApiClient,
    ) {
    }

    public getUser(preload: boolean = true): Observable<UserModel> {
        const userAuthInfo = this.authService.getUserInfo();
        if (!userAuthInfo)
            throw new Error('Not authenticated');

        const result$ = this.userApiClient.getUser().pipe(
            map(user => new UserModel(user))
        );

        if (preload)
            return concat(of(new UserModel(userAuthInfo)), result$);

        return result$;
    }
}