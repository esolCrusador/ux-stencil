import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AuthService } from '@ux-stencil/auth/services/auth.service';
import { AuthProviderType } from '../../providers/auth-provider-type.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
    templateUrl: './sign-in.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnDestroy {
    private readonly subscription$: Subscription;

    public AuthProviderType = AuthProviderType;
    public inProgress: boolean;

    constructor(
        private readonly dialogRef: MatDialogRef<SignInComponent>,
        private readonly authService: AuthService,
    ) {
        this.subscription$ = new Subscription();
    }

    public ngOnDestroy() {
        this.subscription$.unsubscribe();
    }

    public signIn(providerType: AuthProviderType): void {
        this.inProgress = true;

        this.subscription$.add(
            this.authService.signin(providerType).pipe(
                tap(() => this.close(true)),
                finalize(() => this.inProgress = false)
            ).subscribe()
        );
    }

    public close(success: boolean): void {
        this.dialogRef.close(success);
    }
}
