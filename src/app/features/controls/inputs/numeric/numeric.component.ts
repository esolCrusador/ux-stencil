import { DecimalPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { fromEvent, fromEventPattern, interval, merge, Subscription } from "rxjs";
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'my-numeric',
    templateUrl: './numeric.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericComponent implements OnInit, OnDestroy {
    private readonly subscription$: Subscription;
    private precision = 0;
    private value: number;

    public inputValue: string;

    @Input('value') public set valueProperty(value: number | string) {
        this.value = +value;
        this.inputValue = this.getValueString(this.value);
    }
    @Input() public min: number = 0;
    @Input() public max: number = Number.MAX_SAFE_INTEGER;
    @Input('precision') public set numberPrecision(value: string | number) {
        this.precision = +value;
    }

    @Output() public valueChanged: EventEmitter<number>;

    @ViewChild('minus', { static: true }) public minus: ElementRef<HTMLSpanElement>;
    @ViewChild('plus', { static: true }) public plus: ElementRef<HTMLSpanElement>;

    constructor(
        private readonly decimalPipe: DecimalPipe,
    ) {
        this.subscription$ = new Subscription();
        this.valueChanged = new EventEmitter<number>();
    }

    public ngOnInit(): void {
        const step = Math.pow(10, -this.precision);

        this.handleArrow(this.minus.nativeElement, value => value - step);
        this.handleArrow(this.plus.nativeElement, value => value + step);
    }

    public ngOnDestroy(): void {
        this.subscription$.unsubscribe();
        this.valueChanged.complete();
    }

    public onValueChanged(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        this.updateValue(input.value);
        if (input.value !== this.inputValue)
            input.value = this.inputValue;
    }

    private handleArrow(arrow: HTMLElement, updateValue: (prevValue: number) => number) {
        const click$ = fromEvent(arrow, 'click');

        const mouseDown$ = fromEventPattern((handler: (ev: MouseEvent) => void) => arrow.onmousedown = handler, () => arrow.onmouseup = null);
        const mouseUp$ = fromEventPattern((handler: (ev: MouseEvent) => void) => arrow.onmouseup = handler, () => arrow.onmouseup = null);
        const mouseLeave$ = fromEventPattern((handler: (ev: MouseEvent) => void) => arrow.onmouseleave = handler, () => arrow.onmouseup = null);

        const touchStart$ = fromEventPattern((handler: (ev: TouchEvent) => void) => arrow.ontouchstart = handler, () => arrow.ontouchstart = null);
        const touchEnd$ = fromEventPattern((handler: (ev: TouchEvent) => void) => arrow.ontouchend = handler, () => arrow.onmouseup = null);
        const touchCancel$ = fromEventPattern((handler: (ev: TouchEvent) => void) => arrow.ontouchcancel = handler, () => arrow.onmouseup = null);


        this.subscription$.add(
            click$.subscribe(() => this.updateValue(updateValue(this.value || 0)))
        );

        this.subscription$.add(
            mouseDown$
                .pipe(
                    switchMap(() => interval(150).pipe(takeUntil(merge(mouseUp$, mouseLeave$))))
                ).subscribe(() => this.updateValue(updateValue(this.value || 0)))
        );

        this.subscription$.add(
            touchStart$.pipe(
                switchMap(() => interval(150).pipe(takeUntil(merge(touchEnd$, touchCancel$))))
            ).subscribe(() => this.updateValue(updateValue(this.value || 0)))
        );
    }

    private updateValue(inputValue: string | number) {
        let value: number;
        if (inputValue !== null && inputValue !== '') {
            if (typeof inputValue === 'number')
                value = inputValue;
            else {
                inputValue = inputValue.replace(/,/g, '').replace('..', '.');
                value = +inputValue;
            }
        } else {
            value = null;
        }

        const min = this.min;
        const max = this.max;

        if (value === NaN)
            value = min;

        if (value < min)
            value = min;


        if (value > max)
            value = max;

        this.inputValue = this.getValueString(value);
        if (this.value != value)
            this.valueChanged.next(value);
        this.value = value;
    }

    private getValueString(value: number) {
        return value == null ? null : this.decimalPipe.transform(value, `1.${this.precision}-${this.precision}`);
    }
}