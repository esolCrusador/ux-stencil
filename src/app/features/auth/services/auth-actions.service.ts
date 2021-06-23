import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { SignInComponent } from '../components/sign-in/sign-in.component';

@Injectable()
export class AuthActionsService {
    constructor(
        private readonly dialog: MatDialog,
    ) {
    }

    public signIn(): Observable<boolean> {
        return this.dialog.open<SignInComponent>(SignInComponent)
            .afterClosed().pipe(
                first()
            );
    }
}
