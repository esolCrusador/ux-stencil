import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IAddressModel } from '@ux-stencil/common/models/i-address.model';
import { IFormBuilder } from '@ux-stencil/common/forms/i-form.builder';
import { concat, Observable, of, Subject, Subscription } from 'rxjs';
import { CartModel } from '../../../purchase/models/cart.model';
import { IFormGroup } from '@ux-stencil/common/forms/i-form-group';
import { IFormLabels } from '@ux-stencil/common/forms/i-form-labels';
import { CartService } from '@ux-stencil/purchase/services/cart.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CartItemModel } from '@ux-stencil/purchase/models/cart-item.model';
import { UsersService } from '@ux-stencil/users/services/users.service';
import { UserModel } from '@ux-stencil/users/models/user.model';
import { AddressType } from '@ux-stencil/common/models/address-type.enum';

interface IShippingData {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;

    shippingAddress: IAddressModel;
    useShippingAsBilling: boolean;
    billingAddress: IAddressModel;

    instagram: string;
    comments: string;
}

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingComponent implements OnInit, OnDestroy {
    private readonly subscription$: Subscription;
    private readonly formBuilder: IFormBuilder;

    public cart$: Observable<CartModel>;
    public form: IFormGroup<IShippingData>;
    public changed$: Subject<void>;

    public labels: IFormLabels<IShippingData>;

    constructor(
        private readonly cartService: CartService,
        private readonly userService: UsersService,
        formBuilder: FormBuilder,
    ) {
        this.subscription$ = new Subscription();
        this.formBuilder = formBuilder as IFormBuilder;
    }

    public ngOnInit(): void {
        this.cart$ = this.cartService.getCart$().pipe(first());
        this.changed$ = new Subject<void>();

        const shippingAddress = this.createAddressForm(AddressType.Shipping);
        const billingAddress = this.createAddressForm(AddressType.Billing);

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

            shippingAddress: shippingAddress,
            useShippingAsBilling: new FormControl(true),
            billingAddress: billingAddress,

            instagram: new FormControl(''),
            comments: new FormControl('')
        });

        const useShippingAsBilling = this.form.controls.useShippingAsBilling;
        this.subscription$.add(
            concat(of(useShippingAsBilling.value), useShippingAsBilling.valueChanges)
                .subscribe(use => use ? billingAddress.disable() : billingAddress.enable())
        );

        this.subscription$.add(
            this.userService.getUser(true).subscribe(user => {
                this.fillUserData(user);
            })
        );
    }

    public ngOnDestroy(): void {
        this.changed$.complete();
    }

    public trackCartItem(index: number, item: CartItemModel) {
        return item.id;
    }

    public confirmOrder() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            this.changed$.next();
        }
    }

    private fillUserData(user: UserModel) {
        const shippingAddress = user.addresses.find(a => a.addressId === user.lastOrder?.shippingAddressId)
            ?? user.addresses.find(a => a.addressType == AddressType.Shipping);
        const billingAddress = user.addresses.find(a => a.addressId === user.lastOrder?.billingAddressId)
            ?? user.addresses.find(a => a.addressType === AddressType.Billing);

        this.form.patchValue({
            fullName: user.fullName,
            emailAddress: user.email,
            instagram: user.instargam,
            phoneNumber: user.phoneNumber,
        });

        if (shippingAddress)
            this.fillAddressData(this.form.controls.shippingAddress as IFormGroup<IAddressModel>, shippingAddress);

        if (billingAddress)
            this.fillAddressData(this.form.controls.billingAddress as IFormGroup<IAddressModel>, billingAddress);
    }

    private fillAddressData(form: IFormGroup<IAddressModel>, address: IAddressModel) {
        form.patchValue({
            addressId: address.addressId,
            address: address.address,
            address2: address.address2,
            city: address.city,
            state: address.state,
            country: address.country,
            postalCode: address.postalCode,
        });
    }

    private createAddressForm(addressType: AddressType): IFormGroup<IAddressModel> {
        return this.formBuilder.group<IAddressModel>({
            addressId: new FormControl(null, Validators.required),
            address: new FormControl('', Validators.required),
            address2: new FormControl(''),
            city: new FormControl('', Validators.required),
            state: new FormControl(''),
            country: new FormControl('', Validators.required),
            postalCode: new FormControl('', Validators.required),
            addressType: new FormControl(addressType, Validators.required)
        });
    }

}
