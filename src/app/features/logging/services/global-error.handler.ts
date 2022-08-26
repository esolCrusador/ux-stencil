import { ErrorHandler, Injectable } from '@angular/core';
import { ILogger } from '../i-logger';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    constructor(
        private readonly logger: ILogger,
    ) {
        super();
    }

    public handleError(error: any): void {
        this.logger.error(error);
    }
}
