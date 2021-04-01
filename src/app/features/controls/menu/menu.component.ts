import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuProvider } from '../services/menu.provider';
import { MenuStructureModel } from './menu-structure.model';
import { MenuDirection } from './menu-direction.enum';
import { IMenuItemModel } from './i-menu-item.model';
import { ScrollService } from '../services/scroll.service';

@Component({
    selector: 'my-menu',
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
    public MenuDirection = MenuDirection;

    @Input() public set active(value: string) {
        this.menuStructure.active = value;
    }
    @Input() public direction: MenuDirection;

    public menuStructure: MenuStructureModel;

    constructor(
        private readonly menuProvider: MenuProvider,
        private readonly scrollService: ScrollService,
    ) {
        this.menuStructure = new MenuStructureModel(this.menuProvider.getMenu());
    }

    public trackMenuItem(index: number, item: IMenuItemModel) {
        return item.id;
    }

    public menuItemSelected(event: Event, menuItem: IMenuItemModel) {
        event.preventDefault();
        this.scrollService.scrollById(menuItem.id);

        return false;
    }
}
