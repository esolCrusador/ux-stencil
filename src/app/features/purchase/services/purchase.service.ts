import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseApiClient } from '../api-clients/purchase.api-client';
import { OrderCreateModel } from '../models/order-create.model';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchaseApiClient: PurchaseApiClient,
   ) {
  }

  public purchase(order: OrderCreateModel): Observable<number> {
    return this.purchaseApiClient.purchase(order);
  }

  public startPayment(orderId: number): Observable<string> {
    return this.purchaseApiClient.startPayment('Stripe', orderId);
  }
}
