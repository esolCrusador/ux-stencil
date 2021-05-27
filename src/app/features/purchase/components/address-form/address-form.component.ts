import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IFormGroup } from "@ux-stencil/common/forms/i-form-group";
import { IFormLabels } from "@ux-stencil/common/forms/i-form-labels";
import { IAddressModel } from "@ux-stencil/common/models/i-address.model";
import { Observable, Subscription } from "rxjs";

@Component({
    selector: 'my-address-form',
    templateUrl: './address-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements OnInit, OnDestroy {
    private readonly subscription$: Subscription;

    public countries: { id: string, name: string }[] = [
        { id: '1', name: 'Belarus' },
        { id: '2', name: 'Poland' },
        { id: '3', name: 'North Korea' }
    ];
    public filteredCountries: { id: string, name: string }[] = this.countries;

    @Input() public namePrefix: string;
    @Input() public form: IFormGroup<IAddressModel>;
    @Input() public changed$: Observable<void>;

    public labels: IFormLabels<IAddressModel> = {
        address: 'Address',
        address2: 'Address2',
        city: 'City',
        state: 'State/Province',
        postalCode: 'Postal Code',
        country: 'Country'
    }

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
    ) {
        this.subscription$ = new Subscription();
    }

    public ngOnInit(): void {
        this.subscription$.add(this.changed$.subscribe(() => this.changeDetector.markForCheck()));
    }

    public ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
}