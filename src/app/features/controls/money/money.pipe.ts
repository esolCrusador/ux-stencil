import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'moneyPipe',
})
export class MoneyPipe implements PipeTransform {
    constructor(
        private readonly decimalPipe: DecimalPipe,
    ) {
    }

    private static readonly Default = { amount: 0, currencyCode: '$', precision: 2 };

    public transform(value: number, currencyCode?: string, precision?: number) {
        const defaults = MoneyPipe.Default;

        if (!value)
            value = defaults.amount;
        if (!currencyCode)
            currencyCode = defaults.currencyCode;
        if (!precision)
            precision = defaults.precision;

        return `${currencyCode}${this.decimalPipe.transform(value, `1.${precision}-${precision}`)}`;
    }
}
