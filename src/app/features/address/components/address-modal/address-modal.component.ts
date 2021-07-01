import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IAddressModel } from '../../models/i-address.model';
import { AddressService } from '../../services/address.service';
import { ILogger } from '../../../logging/i-logger';

@Component({
    selector: 'my-address-modal',
    templateUrl: './address-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressModalComponent implements OnDestroy {
    private readonly subscription$: Subscription;
    public address: IAddressModel;
    public disabled: boolean;

    constructor(
        private readonly addressService: AddressService,
        private readonly logger: ILogger,
        private readonly dialog: MatDialogRef<AddressModalComponent>,
        @Inject(MAT_DIALOG_DATA) dialogData: { address: IAddressModel },
    ) {
        this.subscription$ = new Subscription();
        this.address = dialogData.address;
        this.disabled = false;
    }

    public ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

    public onAddressUpdated(address: IAddressModel) {
        this.subscription$.add(
            this.addressService.createOrUpdateAddress(address).subscribe({
                next: address => { this.dialog.close(address); },
                error: error => { this.disabled = false; this.logger.error(error); },
                complete: () => { this.disabled = false; }
            })
        );
    }

    public onCancel() {
        this.dialog.close();
    }
}