import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Injectable()
export class NavigateService {
    private isInitialNavigationValue: boolean;

    public get isInitialNavigation(): boolean {
        return this.isInitialNavigationValue;
    }

    constructor(
        private readonly router: Router,
    ) {
        this.isInitialNavigationValue = true;
    }

    public startTrackNavigation(): Subscription {
        return this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            first()
        ).subscribe(() => {
            this.isInitialNavigationValue = false;
        });
    }

    public navigateToDefault() {
        return this.router.navigate(['/']);
    }
}
