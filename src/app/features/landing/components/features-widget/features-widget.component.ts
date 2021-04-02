import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'my-features-widget',
    templateUrl: 'features-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesWidgetComponent {
}
