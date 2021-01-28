import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ScrollService {
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
    ) {

    }

    public scrollById(elementId: string): void {
        const element = this.document.getElementById(elementId);

        element.scrollIntoView({ behavior: 'smooth' });
    }

    public scrollToTop(): void {
        const element = this.document.body;

        element.scrollIntoView({ behavior: 'smooth' });
    }
}
