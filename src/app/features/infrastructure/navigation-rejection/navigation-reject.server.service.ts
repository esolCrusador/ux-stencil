import { INavigationRejectService } from './i-navigation-reject.service';
import { ContextServerState } from '../context.server.state';
import { NavigationRejectionReason } from './navigation-rejection-reason.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class NavigationRejectServerService implements INavigationRejectService {
    constructor(
        private readonly contextServerState: ContextServerState,
    ) {
    }

    public reject(reason: NavigationRejectionReason, message: string): void {
        this.contextServerState.statusCode = reason;
    }
}
