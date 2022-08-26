import { Injectable } from '@angular/core';
import { LandingMenu } from '@ux-stencil/landing/models/landing-menu.enum';
import { IMenuItemModel } from '../menu/i-menu-item.model';

@Injectable()
export class MenuProvider {
    private readonly defaultMenu: { [itemId in keyof typeof LandingMenu]: string } = {
        Product: 'Product',
        Advantages: 'Advantages',
        UxJams: 'UX jam events',
        Order: 'Order'
    };

    private menu: IMenuItemModel[];

    public initalize(): void {
        if (this.menu)
            return;

        const menuItems: IMenuItemModel[] = Object.keys(this.defaultMenu)
            .reduce((agg, itemId: keyof typeof LandingMenu) => {
                agg.push({ id: LandingMenu[itemId], url: '/', title: this.defaultMenu[itemId] });
                return agg;
            }, [] as IMenuItemModel[]
        );

        this.setMenu(menuItems);
    }

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
