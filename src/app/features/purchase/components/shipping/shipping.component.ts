import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IFormBuilder } from '@ux-stencil/common/forms/i-form.builder';
import { concat, Observable, of, Subscription } from 'rxjs';
import { CartModel } from '../../../purchase/models/cart.model';
import { IFormGroup } from '@ux-stencil/common/forms/i-form-group';
import { IFormLabels } from '@ux-stencil/common/forms/i-form-labels';
import { CartService } from '@ux-stencil/purchase/services/cart.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { first, mergeMap, tap } from 'rxjs/operators';
import { CartItemModel } from '@ux-stencil/purchase/models/cart-item.model';
import { UsersService } from '@ux-stencil/users/services/users.service';
import { UserModel } from '@ux-stencil/users/models/user.model';
import { IPatch } from '@ux-stencil/common/models/i-patch';
import { IShippingData } from '../../models/i-shipping-data';
import { PurchaseService } from '@ux-stencil/purchase/services/purchase.service';
import { OrderCreateModel } from '@ux-stencil/purchase/models/order-create.model';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingComponent implements OnInit, OnDestroy {
  private readonly subscription$: Subscription;
  private readonly formBuilder: IFormBuilder;

  private currentCart: CartModel;

  public cart$: Observable<CartModel>;
  public form: IFormGroup<IShippingData>;
  public labels: IFormLabels<IShippingData>;

  public inProgress: boolean;

  constructor(
    private readonly cartService: CartService,
    private readonly userService: UsersService,
    private readonly purchaseService: PurchaseService,
    private readonly changeDetector: ChangeDetectorRef,
    formBuilder: FormBuilder,
  ) {
    this.subscription$ = new Subscription();
    this.formBuilder = formBuilder as IFormBuilder;
  }

  public ngOnInit(): void {
    this.cart$ = this.cartService.getCart$().pipe(first(), tap(cart => this.currentCart = cart));

    this.labels = {
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      emailAddress: 'Email',
      shippingAddress: 'Shipping Address',
      useShippingAsBilling: 'Same as shipping address',
      billingAddress: 'Billing Address',
      instagram: 'Your Instagram',
      comments: 'Your Comments',
    };

    this.form = this.formBuilder.group<IShippingData>({
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl(''),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),

      shippingAddress: new FormControl('', Validators.required),
      useShippingAsBilling: new FormControl(true),
      billingAddress: new FormControl(''),

      instagram: new FormControl(''),
      comments: new FormControl('')
    });

    const controls = this.form.controls;
    const useShippingAsBilling = this.form.controls.useShippingAsBilling;
    this.subscription$.add(
      concat(of(useShippingAsBilling.value), useShippingAsBilling.valueChanges)
        .subscribe(use => use ? controls.billingAddress.disable() : controls.billingAddress.enable())
    );

    this.subscription$.add(
      this.userService.getUser(true).subscribe(user => {
        this.fillUserData(user);
      })
    );
  }

  public ngOnDestroy(): void {
  }

  public trackCartItem(index: number, item: CartItemModel) {
    return item.itemId;
  }

  public confirmOrder() {
    if (!this.form.valid)
      this.form.markAllAsTouched();
    else {
      const shippingData = this.form.value;
      if (shippingData.useShippingAsBilling)
        shippingData.billingAddress = shippingData.shippingAddress;

      this.form.disable({ emitEvent: true, onlySelf: false });
      this.inProgress = true;

      this.subscription$.add(
        this.purchaseService.purchase(new OrderCreateModel(this.currentCart, shippingData))
          .pipe(mergeMap(orderId => this.purchaseService.startPayment(orderId)))
          .subscribe(paymentUrl => window.location.href = paymentUrl)
      );
    }
  }

  private fillUserData(user: UserModel) {
    const shippingAddress = user.addresses.find(a => a.addressId === user.lastOrder?.shippingAddressId)
      ?? user.addresses[0];
    const billingAddress = user.addresses.find(a => a.addressId === user.lastOrder?.billingAddressId)
      ?? user.addresses[0];

    const patch: IPatch<IShippingData> = {
      fullName: user.fullName,
      emailAddress: user.email,
      instagram: user.instargam,
      phoneNumber: user.phoneNumber,
    };

    if (shippingAddress)
      patch.shippingAddress = shippingAddress.addressId;

    if (billingAddress)
      patch.billingAddress = billingAddress.addressId;

    this.form.patchValue(patch);
  }

}
