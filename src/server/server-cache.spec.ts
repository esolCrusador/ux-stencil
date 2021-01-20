import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ServerCache, ITimeMachine } from './server-cache';

class FakeTimeMachine implements ITimeMachine {
    private date: Date = new Date();
    private interval$: Subject<void> = new Subject<void>();

    public iterateInterval(): void {
        this.interval$.next();
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public addMilliseconds(milliseconds: number): void {
        this.date = new Date(this.date.getTime() + milliseconds);
    }

    public getDate(): Date {
        return new Date(this.date);
    }

    public createInterval(action: () => void, period: number): () => void {
        const subscription = this.interval$.subscribe(() => action());
        return () => subscription.unsubscribe();
    }
}

describe('ServerCache', () => {
    let serverCache: ServerCache;
    let fakeTimeMachine: FakeTimeMachine;

    beforeEach(() => {
        fakeTimeMachine = new FakeTimeMachine();
        serverCache = new ServerCache(fakeTimeMachine);
    });

    afterEach(() => {
        serverCache.dispose();
    });

    describe('getOrUpdate', () => {
        let sampleValue: any;
        beforeEach(() => {
            sampleValue = { value: 1 };
        });

        it('should return by delegate', async () => {
            let result = await serverCache.getOrUpdate('123', () => Promise.resolve(sampleValue), 1000, 1000);

            expect(result).toBe(sampleValue);
        });

        it('should get from cache', async () => {
            await serverCache.getOrUpdate('123', () => Promise.resolve(sampleValue), 1000, 1000);
            fakeTimeMachine.addMilliseconds(500);
            let result = await serverCache.getOrUpdate('123', () => Promise.resolve({}), 1000, 1000);

            expect(result).toBe(sampleValue);
        });

        it('should not get from cache if key does not match', async () => {
            await serverCache.getOrUpdate('123', () => Promise.resolve(sampleValue), 1000, 1000);
            fakeTimeMachine.addMilliseconds(500);
            const sampleValue2 = { value: 2 };
            let result = await serverCache.getOrUpdate('456', () => Promise.resolve(sampleValue2), 1000, 1000);

            expect(result).toBe(sampleValue2);
        });

        it('should get from cache if expired', async () => {
            await serverCache.getOrUpdate('123', () => Promise.resolve(sampleValue), 1000, 1000);
            fakeTimeMachine.addMilliseconds(1500);
            let sampleValue2 = { value: 2 };
            let result = await serverCache.getOrUpdate('123', () => Promise.resolve(sampleValue2), 1000, 1000);

            expect(result).toBe(sampleValue2);
        });

        it('should get from cache and than renew', async () => {
            await serverCache.getOrUpdate('123', () => Promise.resolve(sampleValue), 1000, 500);
            fakeTimeMachine.addMilliseconds(750);
            let sampleValue2 = { value: 2 };

            let result1 = await serverCache.getOrUpdate('123', () => Promise.resolve(sampleValue2), 1000, 500);
            expect(result1).toBe(sampleValue);

            fakeTimeMachine.addMilliseconds(200);

            let result2 = await serverCache.getOrUpdate('123', () => Promise.resolve(sampleValue), 1000, 500);
            expect(result2).toBe(sampleValue2);
        });

        it('should return previous value if request is in progreess', async () => {
            await serverCache.getOrUpdate('123', () => Promise.resolve(sampleValue), 1000, 500);
            fakeTimeMachine.addMilliseconds(750);

            let subject1$ = new Subject<any>();
            let value1$ = subject1$.pipe(first()).toPromise();
            let result1 = await serverCache.getOrUpdate('123', () => value1$, 1000, 500);
            expect(result1).toBe(sampleValue);

            fakeTimeMachine.addMilliseconds(200);

            let result2 = await serverCache.getOrUpdate('123', () => Promise.resolve({}), 1000, 500);

            expect(result2).toBe(sampleValue);
            subject1$.next({});
            await value1$;
            subject1$.complete();
        });

        it('should not request promise 2 times', async () => {
            await serverCache.getOrUpdate('123', () => Promise.resolve(sampleValue), 1000, 500);
            fakeTimeMachine.addMilliseconds(750);
            let sampleValue2 = { value: 2 };

            let subject1$ = new Subject<any>();
            const value1$ = subject1$.pipe(first()).toPromise();
            let result1 = await serverCache.getOrUpdate('123', () => value1$, 1000, 500);
            expect(result1).toBe(sampleValue);

            subject1$.next(sampleValue2);
            await value1$;
            fakeTimeMachine.addMilliseconds(750);

            let subject2$ = new Subject<any>();
            let result2 = await serverCache.getOrUpdate('123', () => subject2$.pipe(first()).toPromise(), 1000, 500);
            subject2$.next(sampleValue);

            expect(result2).toBe(sampleValue2);
            subject1$.complete();
            subject2$.complete();
        });
    });

    describe('cleanup', () => {
        it('should not cleanup if not expired', async () => {
            await serverCache.getOrUpdate('123', () => Promise.resolve({}), 1000, 500);

            fakeTimeMachine.addMilliseconds(500);
            fakeTimeMachine.iterateInterval();
            expect(serverCache.hasEntry('123')).toBeTrue();
        });

        it('should cleanup cache', async () => {
            await serverCache.getOrUpdate('123', () => Promise.resolve({}), 1000, 500);

            fakeTimeMachine.addMilliseconds(1500);
            fakeTimeMachine.iterateInterval();
            expect(serverCache.hasEntry('123')).toBeFalse();
        });
    });
});