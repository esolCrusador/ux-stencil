import { CartModel } from './cart.model';
import { IOrderCreate, IOrderLineItemCreate } from './i-order-create';
import { IShippingData } from './i-shipping-data';

export class OrderCreateModel implements IOrderCreate {
  public shippingAddressId: number;
  public billingAddressId: number;
  public lineItems: IOrderLineItemCreate[];
  public email: string;
  public fullName: string;
  public phoneNumber: string;
  public instagram: string;
  public comment: string;

  constructor(cart: CartModel, shipping: IShippingData) {
    this.lineItems = cart.items.map(i => ({ itemId: i.itemId, quantity: i.quantity }));

    this.shippingAddressId = shipping.shippingAddress;
    this.billingAddressId = shipping.billingAddress;
    this.email = shipping.emailAddress;
    this.fullName = shipping.fullName;
    this.phoneNumber = shipping.phoneNumber;
    this.instagram = shipping.instagram;
    this.comment = shipping.comments;
  }
}
