import { Injectable } from '@angular/core';
import { IMenuItemModel } from '../menu/i-menu-item.model';

@Injectable()
export class MenuProvider {
    private menu: IMenuItemModel[];

    public getMenu(): IMenuItemModel[] {
        if (!this.menu)
            throw new Error('Menu is not initialized');

        return this.menu;
    }

    public setMenu(menu: IMenuItemModel[]) {
        if (this.menu)
            throw new Error('Menu can be set only once');

        this.menu = menu;
    }
}
