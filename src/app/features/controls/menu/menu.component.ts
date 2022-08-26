import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MenuProvider } from '../services/menu.provider';
import { MenuStructureModel } from './menu-structure.model';
import { MenuDirection } from './menu-direction.enum';
import { IMenuItemModel } from './i-menu-item.model';
import { ScrollService } from '../services/scroll.service';
import { Router } from '@angular/router';
import { ILogger } from '@ux-stencil/logging/i-logger';

@Component({
    selector: 'my-menu',
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
    public MenuDirection = MenuDirection;

    @Input() public set active(value: string) {
        this.menuStructure.active = value;
    }
    @Input() public direction: MenuDirection;

    public menuStructure: MenuStructureModel;

    constructor(
        private readonly menuProvider: MenuProvider,
        private readonly scrollService: ScrollService,
        private readonly router: Router,
        private readonly logger: ILogger,
    ) {
        this.menuStructure = new MenuStructureModel(this.menuProvider.getMenu());
    }

    public ngOnInit(): void {
    }

    public trackMenuItem(index: number, item: IMenuItemModel) {
        return item.id;
    }

    public menuItemSelected(event: Event, menuItem: IMenuItemModel) {
        event.preventDefault();
        if (menuItem.url === this.router.url) {
            this.scrollService.scrollById(menuItem.id);
        } else {
            this.router.navigateByUrl(menuItem.url).then(success => {
                if (success && menuItem.id)
                    this.retryWithTimeout(() => this.scrollService.scrollById(menuItem.id));
            });
        }

        return false;
    }

    private retryWithTimeout(action: () => void, times: number = 5, timeout = 0) {
        return setTimeout(() => {
            try {
                action();
            } catch (e) {
                if (times <= 0)
                    this.logger.error(e);
                else {
                    this.logger.debug('Retry');
                    this.retryWithTimeout(action, times - 1, timeout);
                }
            }
        }, timeout);
    }
}
