import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'my-modal',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './modal.component.html',
})
export class ModalComponent<TComponent> {
    constructor(
        private readonly dialogRef: MatDialogRef<TComponent>,
    ) {
    }

    public close(): void {
        this.dialogRef.close(false);
    }
}