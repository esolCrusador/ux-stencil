import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAddressModel } from '../../models/i-address.model';
import { IFormGroup } from '@ux-stencil/common/forms/i-form-group';
import { IFormLabels } from '@ux-stencil/common/forms/i-form-labels';
import { IFormBuilder } from '@ux-stencil/common/forms/i-form.builder';
import { Observable } from 'rxjs';
import { IdName } from '@ux-stencil/common/models/id-name';
import { AddressService } from '@ux-stencil/address/services/address.service';

@Component({
    selector: 'my-address-form',
    templateUrl: './address-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements OnInit, OnDestroy {
    private readonly formBuilder: IFormBuilder;

    @Input() public value: IAddressModel;
    @Input() public disabled: boolean;
    @Output() public valueChanged: EventEmitter<IAddressModel>;
    @Output() public cancelled: EventEmitter<void>;

    public countries$: Observable<IdName<string>[]>;
    public filteredCountries: IdName<string>[];

    public labels: IFormLabels<IAddressModel> = {
        addressId: 'Address Id',
        address: 'Address',
        address2: 'Address2',
        city: 'City',
        state: 'State/Province',
        postalCode: 'Postal Code',
        countryId: 'Country',
    };
    public form: IFormGroup<IAddressModel>;

    constructor(
        formBuilder: FormBuilder,
        private readonly addressService: AddressService,
    ) {
        this.formBuilder = formBuilder as IFormBuilder;
        this.valueChanged = new EventEmitter<IAddressModel>();
        this.cancelled = new EventEmitter<void>();
    }

    public ngOnInit(): void {
        const address = this.value;

        this.countries$ = this.addressService.getCountries$();

        this.form = this.formBuilder.group<IAddressModel>({
            addressId: new FormControl(address?.addressId ?? 0),
            address: new FormControl(address?.address, Validators.required),
            address2: new FormControl(address?.address2),
            city: new FormControl(address?.city, Validators.required),
            state: new FormControl(address?.state),
            countryId: new FormControl(address?.countryId, Validators.required),
            postalCode: new FormControl(address?.postalCode, Validators.required),
        });
    }

    public ngOnDestroy(): void {
        this.valueChanged.complete();
        this.cancelled.complete();
    }

    public onFiltered(countries: IdName<string>[]) {
        this.filteredCountries = countries;
    }

    public cancel(): void {
        this.cancelled.next();
    }

    public save(): void {
        this.form.markAllAsTouched();

        if (this.form.valid)
            this.valueChanged.next(this.form.value);
    }
}
