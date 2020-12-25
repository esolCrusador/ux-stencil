import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
    selector: 'my-repeater',
    templateUrl: './repeater.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeaterComponent implements OnInit {
    private _rows: number;
    private _cols: number;

    @Input() public rowClass: string = 'row';
    @Input() public set rows(value: number) {
        value = +value;
        if (this._rows === value)
            return;

        this._rows = value;
        this.rowIndexes = this.generateIndexArray(value);
    }
    @Input() public set cols(value: number) {
        value = +value;
        if (this._cols === value)
            return;

        this._cols = value;
        this.colIndexes = this.generateIndexArray(value);
    }
    @ContentChild('item', { static: false })
    public itemTemplateRef: TemplateRef<{ row: number, col: number }>;

    public rowIndexes: number[];
    public colIndexes: number[];

    public ngOnInit() {
        if (!this._rows)
            this.rows = 1;
        if (!this._cols)
            this.cols = 1;
    }

    private generateIndexArray(length: number): number[] {
        const result = new Array(length);
        for (let i = 0; i < length; i++) {
            result[i] = i;
        }

        return result;
    }
}