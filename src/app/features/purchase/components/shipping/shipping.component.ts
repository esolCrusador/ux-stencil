import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
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
import { IPatch } from '@ux-stencil/common/models/i-patch';

interface IShippingData {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;

    shippingAddress: number;
    useShippingAsBilling: boolean;
    billingAddress: number;

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
