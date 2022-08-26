import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TransferState } from '@angular/platform-browser';
import { IMap } from '../../common/models/i-map';

@Injectable()
export class HttpBrowserService extends HttpService {
  private readonly storedRequests: IMap<any>;

  constructor(
    httpClient: HttpClient,
    transferState: TransferState,
  ) {
    super(httpClient);

    const ssrData = transferState.get<IMap<any>>(this.transferStateKey, null);
    if (ssrData) {
      this.storedRequests = ssrData;
      transferState.remove(this.transferStateKey);
    } else {
      this.storedRequests = {};
    }
  }

  public get<TModel>(url: string, queryParams?: IMap<string | string[]>): Observable<TModel> {
    const urlKey = this.getUrlKey(url, queryParams);
    const storedRequest = this.storedRequests[urlKey];

    if (storedRequest) {
      delete this.storedRequests[urlKey];
      return of(storedRequest);
    }

    return super.get(url, queryParams);
  }
}
