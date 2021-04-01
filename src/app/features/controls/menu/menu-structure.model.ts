import { IMenuItemModel } from './i-menu-item.model';

export class MenuStructureModel {
    public items: IMenuItemModel[];
    public activeIndex: number = -1;

    public get active(): string {
        if (this.activeIndex === -1)
            return null;

        return this.items[this.activeIndex].id;
    }
    public set active(value: string) {
        this.activeIndex = this.items.findIndex(i => i.id === value);
    }

    public isActive(menuItem: IMenuItemModel): boolean {
        return menuItem.id === this.active;
    }

    constructor(items: IMenuItemModel[]) {
        this.items = items;
    }
}
