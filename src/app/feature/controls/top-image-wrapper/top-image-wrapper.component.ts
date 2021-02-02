import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IImageModel } from "../../images-gallery/models/i-image.model";

@Component({
    selector: 'my-top-image-wrapper',
    templateUrl: './top-image-wrapper.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopImageWrapperComponent {
    @Input() public image: IImageModel;
}