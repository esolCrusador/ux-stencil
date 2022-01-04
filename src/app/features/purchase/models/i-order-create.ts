export interface IOrderCreate {
  shippingAddressId: number;
  billingAddressId: number;
  lineItems: IOrderLineItemCreate[];
  email: string;
  fullName: string;
  phoneNumber: string;
  instagram: string;
  comment: string;
}

export interface IOrderLineItemCreate {
  itemId: number;
  quantity: number;
}
