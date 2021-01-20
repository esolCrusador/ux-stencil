interface CacheEntry {
    value: any;
    createValue$: Promise<any>;
    renewDate: Date;
    expirationDate: Date;
}

export interface ITimeMachine {
    getDate(): Date;
    createInterval(action: () => void, period: number): () => void;
}

export class ServerCache {
    private readonly timeMachine: ITimeMachine;
    private readonly _cacheDictionary: Map<string, CacheEntry>;
    private readonly _disposeInterval: () => void;

    constructor(
        timeMachine?: ITimeMachine,
        cleanupInterval: number = 60 * 1000
    ) {
        if (!timeMachine)
            timeMachine = {
                getDate : () => new Date(),
                createInterval: (action, period) => {
                    const interval = setInterval(() => action(), period);
                    return () => clearInterval(interval);
                }
            };
        this.timeMachine = timeMachine;

        this._cacheDictionary = new Map<string, CacheEntry>();
        this._disposeInterval = this.timeMachine.createInterval(() => this.cleanup(), cleanupInterval);
    }

    public dispose(): void {
        this._disposeInterval();
    }

    public async getOrUpdate<TValue>(key: string, create: () => Promise<TValue>, expiration: number, renew: number): Promise<TValue> {
        const cacheEntry = this._cacheDictionary.get(key);
        if (!cacheEntry || this.isExpired(cacheEntry)) {
            const value = await create();
            this._cacheDictionary.set(key, this.createEntry(value, expiration, renew));
            return value;
        }

        if (this.shouldRenew(cacheEntry) && !cacheEntry.createValue$) {
            cacheEntry.createValue$ = create();
            cacheEntry.createValue$.then(value => {
                this.updateEntry(cacheEntry, value, expiration, renew);
            }).catch(error => console.error(error));
        }

        return cacheEntry.value;
    }

    public hasEntry(key: string): boolean {
        return this._cacheDictionary.has(key);
    }

    private createEntry<TValue>(value: TValue, expiration: number, renew: number): CacheEntry {
        const cacheEntry = {} as CacheEntry;
        this.updateEntry(cacheEntry, value, expiration, renew);
        return cacheEntry;
    }

    private updateEntry<TValue>(entry: CacheEntry, value: TValue, expiration: number, renew: number): void {
        const renewDate = new Date(this.timeMachine.getDate().getTime() + renew);
        const expirationDate = new Date(this.timeMachine.getDate().getTime() + expiration);

        entry.renewDate = renewDate;
        entry.expirationDate = expirationDate;
        entry.value = value;
        entry.createValue$ = null;
    }

    private isExpired(cacheEntry: CacheEntry): boolean {
        return this.timeMachine.getDate() > cacheEntry.expirationDate;
    }

    private shouldRenew(cacheEntry: CacheEntry): boolean {
        return this.timeMachine.getDate() > cacheEntry.renewDate;
    }

    private cleanup() {
        for (const [key, entry] of this._cacheDictionary.entries()) {
            if (this.isExpired(entry))
                this._cacheDictionary.delete(key);
        }
    }
}
