import { Injectable, Inject } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from '../cookies/cookie.service';
import { TransferState } from '@angular/platform-browser';
import { IMap } from '../../common/models/i-map';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable()
export class HttpServerService extends HttpService {
  private readonly baseUrl: string;
  private readonly absoluteUrlRegex: RegExp;

  private stored: IMap<any>;

  constructor(
    httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    @Inject(REQUEST) protected request: Request,
    private readonly cookieService: CookieService,
    private readonly transferState: TransferState,
  ) {
    super(httpClient);
    this.absoluteUrlRegex = /^https?:\/\//i;
    this.baseUrl = baseUrl;
    if (this.baseUrl.endsWith('/'))
      this.baseUrl = this.baseUrl.substring(0, this.baseUrl.length - 1);

    this.transferState.onSerialize(this.transferStateKey, () => {
      return this.stored ? Object.keys(this.stored).sort().reduce((agg, key) => {
        agg[key] = this.stored[key];
        return agg;
      }, {} as IMap<any>) : null;
    });
  }

  public get<TModel>(url: string, queryParams: IMap<string | string[]>): Observable<TModel> {
    const request$ = super.get(this.resolveUrl(url), queryParams) as Observable<TModel>;

    return request$.pipe(tap(response => {
      this.store(this.getUrlKey(url, queryParams), response);
    }));
  }

  protected getHeadersMap(): IMap<string> {
    const headersMap = super.getHeadersMap();
    headersMap['cookie'] = this.cookieService.getAllCookie();
    headersMap['X-Forwarded-For'] = this.request.headers['X-Forwarded-For'];

    return headersMap;
  }

  private store<TModel>(url: string, response: TModel) {
    if (!this.stored) {
      this.stored = {};
    }
    this.stored[url] = response;
  }

  private resolveUrl(url: string): string {
    if (this.absoluteUrlRegex.test(url))
      return url;

    return this.baseUrl + url;
  }
}
