import { Injectable } from '@angular/core';
import { NgAnimateScrollService } from 'ng-animate-scroll';

@Injectable()
export class ScrollService {
    constructor(
        private readonly ngAnimateScrollService: NgAnimateScrollService,
    ) {

    }

    public scrollById(elementId: string): void {
        this.ngAnimateScrollService.scrollToElement(elementId, 500);
    }

    public scrollToTop(): void {
        this.ngAnimateScrollService.scrollToElement('main-content', 500);
    }
}
