import { Injectable } from "@angular/core";
import { HttpService } from "@ux-stencil/infrastructure/http/http.service";
import { Observable } from "rxjs";
import { OrderCreateModel } from "../models/order-create.model";

@Injectable()
export class PurchaseApiClient {
  constructor(
    private readonly httpService: HttpService
  ) {

  }
  public purchase(order: OrderCreateModel): Observable<number> {
    return this.httpService.post('api/purchase', order);
  }

  public startPayment(provider: string, orderId: number): Observable<string> {
    return this.httpService.post(`api/purchase/${provider}/pay/${orderId}`, null);
  }
}
