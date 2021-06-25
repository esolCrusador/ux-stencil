import { NgModule } from '@angular/core';
import { UsersApiClient } from './api-clients/users.api-client';
import { UsersService } from './services/users.service';

@NgModule({
    providers: [
        UsersService,
        UsersApiClient,
    ]
})
export class UsersModule {
}