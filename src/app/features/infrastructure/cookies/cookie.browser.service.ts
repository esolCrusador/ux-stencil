import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from './cookie.service';

@Injectable()
export class CookieBrowserService extends CookieService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    super();
  }

  public getAllCookie() {
    return this.document.cookie;
  }

  public setCookie(cookieName: string, cookieValue: string, expirationDate: Date) {
    let newCookie: string;

    if (cookieValue) {
      newCookie = `${cookieName}=${encodeURIComponent(cookieValue)}; Path=/`;

      if (expirationDate) {
        newCookie += `; Expires=${expirationDate.toUTCString()}`;
      }
    } else {
      newCookie = `${cookieName}=; Path=/; Max-Age=0`;
    }

    this.document.cookie = newCookie;
  }
}
