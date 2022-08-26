import { Injectable } from '@angular/core';
import { HttpService } from '@ux-stencil/infrastructure/http/http.service';
import { Observable } from 'rxjs';
import { IFrontendConfiguration } from './models/i-frontnd-configuration';

@Injectable()
export class ConfigurationApiClient {
    constructor(
        private readonly httpService: HttpService,
    ) { }

    public getConfiguration(): Observable<IFrontendConfiguration> {
        return this.httpService.get('api/configuration');
    }
}
