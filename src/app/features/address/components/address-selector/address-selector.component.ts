import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatRadioChange } from "@angular/material/radio";
import { IdName } from "@ux-stencil/common/models/id-name";
import { ILogger } from "@ux-stencil/logging/i-logger";
import { Observable } from "rxjs";
import { IAddressModel } from "../../models/i-address.model";
import { AddressService } from "../../services/address.service";
import { AddressModalComponent } from "../address-modal/address-modal.component";

@Component({
    selector: 'my-address-selector',
    templateUrl: './address-selector.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,

    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => AddressSelectorComponent),
        }
    ]
})
export class AddressSelectorComponent implements OnInit, ControlValueAccessor {
    private onChangeDelegate: (value: number) => void;
    private onTouchedDelegate: () => void;

    public value: number;
    public disabled: boolean;
    public addresses$: Observable<IAddressModel[]>;

    constructor(
        private readonly addressService: AddressService,
        private readonly matDialog: MatDialog,
        private readonly logger: ILogger,
    ) {

    }

    public ngOnInit(): void {
        this.addresses$ = this.addressService.getAddresses();
    }

    public getCountry$(countryId: number): Observable<string> {
        return this.addressService.getCountry$(countryId);
    }

    public addAddress(): void {
        this.matDialog.open<AddressModalComponent>(AddressModalComponent, { data: { address: null } })
            .afterClosed().subscribe({
                next: (address: IAddressModel) => { if (address) { this.value = address.addressId } },
                error: error => this.logger.error(error)
            });
    }

    public writeValue(value: number): void {
        this.value = value;
    }

    public registerOnChange(onChangeDelegate: (value: number) => void): void {
        this.onChangeDelegate = onChangeDelegate;
    }

    public registerOnTouched(onTouchedDelegate: () => void): void {
        this.onChangeDelegate = onTouchedDelegate;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public onSelectionChanged(change: MatRadioChange): void {
        this.value = change.value;
        this.onChangeDelegate && this.onChangeDelegate(change.value);
        this.onTouchedDelegate && this.onTouchedDelegate();
    }

    public onEdit(address: IAddressModel): void {
        this.matDialog.open<AddressModalComponent>(AddressModalComponent, { data: { address: address } })
            .afterClosed().subscribe({ error: error => this.logger.error(error) });
    }

    public onDelete(address: IAddressModel): void {
        this.addressService.deleteAddress(address).subscribe({
            error: error => this.logger.error(error)
        });
    }
}