import { Component } from "@angular/core";
import { ContactType } from "src/app/feature/controls/contact-link/contact.pipe";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent {
    public ContactType = ContactType;

    public instagram = 'verons_ux_design';
    public telegram = 'veronica_sotskaya';
    public mail = 'veronica.sotskaya@gmail.com';
}