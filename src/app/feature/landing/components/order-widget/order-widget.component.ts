import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: 'my-order-widget',
    templateUrl: './order-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderWidgetComponent {
    @Input() public orderId: string;
}