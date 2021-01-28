import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
    selector: 'my-back-to-top',
    templateUrl: './back-to-top.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTopComponent {
    constructor(
        private readonly scrollService: ScrollService,
    ) {
    }

    public scrollToTop(): void {
        this.scrollService.scrollToTop();
    }
}
