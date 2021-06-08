import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "../../infrastructure/http/http.service";
import { AuthProviderType } from "../providers/auth-provider-type.enum";

@Injectable()
export class AuthApiClient {
  constructor(
    private readonly httpService: HttpService,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {

  }

  public signout(): Observable<void> {
    return this.httpService.post('/api/auth/log-out', null);
  }

  public finishAuthentication(authProviderType: AuthProviderType, accessToken: string): Observable<void> {
    return this.httpService.post(`/api/auth/finish-authentication/${authProviderType}`, accessToken);
  }

  public refresh(): Observable<void> {
    return this.httpService.post('/api/auth/refresh', null);
  }

  public delete(): Observable<void> {
    return this.httpService.delete('/api/auth');
  }

  public navigateToLoginUrl(authProviderType: AuthProviderType): void {
    this.document.location.href = this.getLoginUrl(authProviderType, true);
  }

  public getLoginUrl(authProviderType: AuthProviderType, addReturnUrl: boolean): string {
    let loginUrl = `/api/auth/external-login/${authProviderType}`;
    const queryParams = [];

    const location = this.document.location;

    if (location.host.includes('localhost'))
      queryParams.push(`domain=${encodeURIComponent(location.protocol + '//' + location.host)}`);

    if (addReturnUrl)
      queryParams.push(`returnUrl=${encodeURIComponent(this.document.location.href)}`);

    if (queryParams.length > 0)
      loginUrl += '?' + queryParams.join('&');

    return loginUrl;
  }
}