import { Inject, Injectable } from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { CookieService } from './cookie.service';

@Injectable()
export class CookieServerService extends CookieService {
  constructor(
    @Inject(REQUEST) protected request: Request,
    @Inject(RESPONSE) protected response: Response
  ) {
    super();
  }

  public getAllCookie(): string {
    return this.request.headers.get('cookie');
  }

  public setCookie(cookieName: string, cookieValue: string) {
    const cookieArray = this.parseCookie(this.getAllCookie());
    const name = `${cookieName}=`;
    const newCookie = `${name}${encodeURIComponent(cookieValue ? cookieValue : '')}`;
    let isNewCookie = true;
    let indexOfSetCookie = -1;

    for (let i = 0; i < cookieArray.length; i++) {
      const c = cookieArray[i];
      if (c.indexOf(name) === 0) {
        cookieArray[i] = newCookie;
        isNewCookie = false;
        indexOfSetCookie = i;
        break;
      }
    }

    if (!cookieValue) {
      if (indexOfSetCookie >= 0) {
        cookieArray.splice(indexOfSetCookie, 1);
      }
    } else {
      if (isNewCookie) {
        cookieArray.push(newCookie);
      }
    }

    this.response.headers.set('cookie', cookieArray.join('; '));
  }
}
