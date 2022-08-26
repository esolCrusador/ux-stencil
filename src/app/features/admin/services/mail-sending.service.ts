import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMailRequest } from '../models/i-mail.requestl';
import { IMailSendResponse } from '../models/i-mail-send.response';

@Injectable()
export class MailSendingService {
    constructor(private readonly httpClient: HttpClient) {
    }

    public sendMail(model: IMailRequest): Observable<IMailSendResponse> {
        return this.httpClient.post('https://ux-stencil-api.azurewebsites.net/api/mail', model) as Observable<IMailSendResponse>;
    }
}
