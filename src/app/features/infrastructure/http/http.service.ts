import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, timeout, catchError, filter } from 'rxjs/operators';
import { StateKey, makeStateKey } from '@angular/platform-browser';
import { IHttpError } from '../models/i-http-error';
import { IMap } from '../../common/models/i-map';
import { UploadEvent, UploadEventType } from '../../common/models/http/upload.event';

@Injectable()
export abstract class HttpService {
  private readonly uploadTimeout: number = 60000; // 60 seconds
  private readonly requestTimeout: number = 30000; // 30 seconds

  protected readonly transferStateKey: StateKey<IMap<string>> = makeStateKey('api-requests');

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public get<TModel>(url: string, queryParams?: IMap<string | string[]>): Observable<TModel> {
    const response$ = this.httpClient.get(url, { headers: this.getHeaders(), params: queryParams }) as Observable<TModel>;

    return response$.pipe(catchError(this.formatErrors), timeout(this.requestTimeout));
  }

  public delete<TModel>(url: string): Observable<TModel> {
    const response$ = this.httpClient.delete(url, { headers: this.getHeaders() }) as Observable<TModel>;

    return response$.pipe(catchError(this.formatErrors), timeout(this.requestTimeout));
  }

  public post<TResponse>(url: string, request: any, queryParams?: IMap<string | string[]>): Observable<TResponse> {
    const response$ = this.httpClient.post(
      url,
      request && JSON.stringify(request),
      { headers: this.getHeaders(), params: queryParams }
    ) as Observable<TResponse>;

    return response$.pipe(catchError(this.formatErrors), timeout(this.requestTimeout));
  }

  public put<TResponse>(url: string, request: any): Observable<TResponse> {
    const response$ = this.httpClient.put(
      url,
      request && JSON.stringify(request),
      { headers: this.getHeaders() }
    ) as Observable<TResponse>;

    return response$.pipe(catchError(this.formatErrors), timeout(this.requestTimeout));
  }

  public upload<TResult = void>(path: string, data: any, params?: any, headers?: HttpHeaders): Observable<UploadEvent<TResult>> {
    return this.httpClient
      .request(
        new HttpRequest('PUT', path, data, {
          params: params,
          reportProgress: true,
          headers: headers
        })
      )
      .pipe(
        filter(event => event.type === HttpEventType.UploadProgress || event.type === HttpEventType.Response),
        map(event => {
          if (event.type === HttpEventType.UploadProgress) {
            return new UploadEvent<TResult>(UploadEventType.InProgress, undefined, event.loaded, event.total);
          } else if (event instanceof HttpResponse) {
            return new UploadEvent(UploadEventType.Completed, event.body as TResult);
          } else {
            throw new Error('Not supported event type: ' + HttpEventType[event.type]);
          }
        }),
        catchError(this.formatErrors),
        timeout(this.uploadTimeout),
      );
  }

  protected getHeadersMap(): IMap<string> {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  protected getUrlKey(url: string, queryParams: IMap<string | string[]>) {
    if (!queryParams)
      return url;

    const keys = Object.keys(queryParams);
    if (keys.length === 0)
      return url;


    const queryString = keys.reduce(
      (agg, key) => {
        const paramValue = queryParams[key];
        if (Array.isArray(paramValue))
          agg.push(...paramValue.map(pv => `${key}=${pv}`));
        else
          agg.push(`${key}=${paramValue}`);


        return agg;
      },
      [] as string[]
    );
    return `${url}?${queryString.join('&')}`;
  }

  private getHeaders(): HttpHeaders {
    const headers = this.getHeadersMap();
    return new HttpHeaders(headers);
  }

  private formatErrors = (response: any): Observable<never> => {
    if (response instanceof HttpErrorResponse) {
      const errorObj: IHttpError = {
        url: response.url,
        httpStatus: response.status,
        httpStatusMessage: response.statusText,
        error: {
          code: response.status,
          message: response.error,
        }
      };

      return throwError(errorObj);
    }

    return throwError(response);
  }
}
