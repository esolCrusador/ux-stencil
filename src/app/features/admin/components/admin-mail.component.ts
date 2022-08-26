import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MailSendingService } from '../services/mail-sending.service';

@Component({
    selector: 'app-admin-mail',
    templateUrl: './admin-mail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMailComponent implements OnInit, OnDestroy {
    private readonly subscription$: Subscription;
    public form: FormGroup;

    public sending: boolean;
    public sendingResult: string;
    public sendingSuccessful: boolean;

    constructor(
        private readonly mailSendingService: MailSendingService,
        private readonly changeDetector: ChangeDetectorRef,
    ) {
        this.subscription$ = new Subscription();
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            recipient: new FormControl(null, [Validators.required, Validators.email]),
            recipientName: new FormControl(null, [Validators.required]),
            subject: new FormControl('UX Stencil is available!', [Validators.required])
        });
    }


    public ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

    public sendEmail(event: Event) {
        event.preventDefault();
        for (const control of Object.keys(this.form.controls))
            this.form.controls[control].markAsDirty();

        if (!this.form.valid)
            return;

        this.sending = true;
        const subscription$ = this.mailSendingService.sendMail(this.form.value).subscribe({
            next: response => {
                this.sendingSuccessful = true;
                this.sendingResult = response.message;
                this.sending = false;
                this.changeDetector.markForCheck();
            },
            error: error => {
                this.sendingSuccessful = false;
                this.sendingResult = JSON.stringify(error);
                this.sending = false;
                this.changeDetector.markForCheck();
            }
        });
        this.subscription$.add(subscription$);
    }
}
