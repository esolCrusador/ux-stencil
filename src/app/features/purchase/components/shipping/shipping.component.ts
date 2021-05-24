import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { CartModel } from "../../models/cart.model";
import { CartItemModel } from "../../models/cart-item.model";
import { concat, Observable, of, Subject, Subscription } from "rxjs";
import { CartService } from "../../services/cart.service";
import { first } from "rxjs/operators";
import { IFormBuilder } from '@ux-stencil/common/forms/i-form.builder';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { IFormGroup } from "@ux-stencil/common/forms/i-form-group";
import { IFormLabels } from "@ux-stencil/common/forms/i-form-labels";
import { IAddressModel } from '@ux-stencil/common/models/i-address.model';

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
        formBuilder: FormBuilder,
    ) {
        this.subscription$ = new Subscription();
        this.formBuilder = formBuilder as IFormBuilder;
    }

    public ngOnInit(): void {
        this.cart$ = this.cartService.getCart$().pipe(first());
        this.changed$ = new Subject<void>();

        const shippingAddress = this.createAddressForm();
        const billingAddress = this.createAddressForm();

        this.labels = {
            fullName: 'Full Name',
            phoneNumber: 'Phone Number',
            emailAddress: 'Email',
            shippingAddress: 'Shipping Address',
            useShippingAsBilling: 'Same as shipping address',
            billingAddress: 'Billing Address',
            instagram: 'Your Instagram',
            comments: 'Your Comments',
        }

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

    private createAddressForm(): IFormGroup<IAddressModel> {
        return this.formBuilder.group<IAddressModel>({
            address: new FormControl('', Validators.required),
            address2: new FormControl(''),
            city: new FormControl('', Validators.required),
            state: new FormControl(''),
            country: new FormControl('', Validators.required),
            postalCode: new FormControl('', Validators.required)
        });
    }

}