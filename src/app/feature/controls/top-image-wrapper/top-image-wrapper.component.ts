import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: 'my-top-image-wrapper',
    templateUrl: './top-image-wrapper.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopImageWrapperComponent {
    @Input() public imageUrl: string;
}