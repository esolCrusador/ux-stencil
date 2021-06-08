import { Injectable } from '@angular/core';

@Injectable()
export abstract class CookieService {
  public abstract getAllCookie(): string;

  public getCookie(cookieName: string) {
    const cookieArray = this.parseCookie(this.getAllCookie());
    const name = `${cookieName}=`;

    for (const cookie of cookieArray) {
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length);
      }
    }
    return null;
  }

  public abstract setCookie(cookieName: string, cookieValue: string, expirationDate: Date): void;

  protected parseCookie(cookie: string) {
    const decodedCookie = decodeURIComponent(cookie);
    return decodedCookie.split(';').map(c => c.trim());
  }
}
