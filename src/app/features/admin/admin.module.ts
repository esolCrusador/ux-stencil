import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminMailComponent } from './components/admin-mail.component';
import { MailSendingService } from './services/mail-sending.service';
import { ControlsModule } from '@ux-stencil/controls/controls.module';

@NgModule({
    imports: [
        ControlsModule,
        AdminRoutingModule,
    ],
    declarations:
    [
        AdminMailComponent,
    ],
    providers: [
        MailSendingService,
    ]
})
export class AdminModule {
}