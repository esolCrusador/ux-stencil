export function sumFunction<TElement>(array: TElement[], resultSelector: (element: TElement) => number): number {
    let aggregate = 0;
    for (let element of array) {
        aggregate += resultSelector(element);
    }

    return aggregate;
}