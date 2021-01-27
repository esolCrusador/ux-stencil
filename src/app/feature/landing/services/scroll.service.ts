import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class ScrollService {
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
    ) {

    }

    public scrollById(elementId: string) {
        const element = this.document.getElementById(elementId);

        element.scrollIntoView({ behavior: 'smooth' });
    }
}