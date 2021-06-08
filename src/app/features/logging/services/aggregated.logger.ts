import { ILogger, LOGGER_KIND } from '../i-logger';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class AggregatedLogger implements ILogger {
    private readonly loggers: ILogger[];

    constructor(
        @Inject(LOGGER_KIND) loggers: ILogger[]
    ) {
        this.loggers = loggers.filter(logger => logger.isEnabled());
    }

    public isEnabled(): boolean {
        return true;
    }

    public setUser(userId: number, userName: string): void {
        this.forEachLogger(logger => logger.setUser(userId, userName));
    }

    public debug(message: any, optionalParameters?: any[]): void {
        this.forEachLogger(logger => logger.debug(message, optionalParameters));
    }
    public info(message: any, optionalParameters?: any[]): void {
        this.forEachLogger(logger => logger.info(message, optionalParameters));
    }
    public warn(message: any, optionalParameters?: any[]): void {
        this.forEachLogger(logger => logger.warn(message, optionalParameters));
    }
    public error(message: any, optionalParameters?: any[]): void {
        this.forEachLogger(logger => logger.error(message, optionalParameters));
    }

    private forEachLogger(log: (logger: ILogger) => void) {
        for (const logger of this.loggers) {
            this.addToQueue(() => log(logger));
        }
    }

    private addToQueue(method: () => void): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                method();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
}
