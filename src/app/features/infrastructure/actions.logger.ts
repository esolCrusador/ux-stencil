import { ILogger } from '../logging/i-logger';
import { Actions } from '@ngxs/store';
import { Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ErrorBaseAction as FailedAction } from '../common/models/error-base.action';
import { Injectable } from '@angular/core';
import { ActionStatus } from '@ngxs/store/src/actions-stream';

@Injectable({ providedIn: 'root' })
export class ActionsLogger {
    constructor(private readonly logger: ILogger, private readonly actions: Actions) {
    }

    public startLogging(): Subscription {
        return new Observable<{ action: any, status: ActionStatus }>(
            observer => {
                const subscription$ = this.actions.subscribe({
                    next: action => observer.next(action),
                    error: error => observer.error(error),
                    complete: () => observer.complete()
                });

                return () => subscription$.unsubscribe();
            })
            .pipe(
                filter(action => action.action instanceof FailedAction),
                map(action => action.action as FailedAction)
            )
            .subscribe((action: FailedAction) => this.logger.error(action.error));
    }
}
