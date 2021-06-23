import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { NavigateService } from '@ux-stencil/common/services/navigate.service';
import { Observable } from 'rxjs';
import { AuthActionsService } from './auth-actions.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly authActionsService: AuthActionsService,
        private readonly navigateService: NavigateService,
        @Inject(PLATFORM_ID) private readonly platformId: Object,
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.handle$();
    }

    public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
        return this.handle$();
    }

    private handle$(): Observable<boolean> | boolean {
        const isAuthenticated = !!this.authService.getUserInfo();

        if (!isAuthenticated && !this.navigateService.isInitialNavigation && isPlatformBrowser(this.platformId))
            return this.authActionsService.signIn();

        if (!isAuthenticated)
            this.navigateService.navigateToDefault();

        return isAuthenticated;
    }
}