import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../infrastructure/http/http.service';
import { IUserModel } from '../models/i-user.model';

@Injectable()
export class UsersApiClient {
    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    public getUser(): Observable<IUserModel> {
        return this.httpService.get('api/users');
    }
}
