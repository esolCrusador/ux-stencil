import { IMenuItemModel } from './i-menu-item.model';

export class MenuStructureModel {
    public items: IMenuItemModel[];
    public activeIndex: number = 0;

    public get active(): string {
        return this.items[this.activeIndex].id;
    }
    public set active(value: string) {
        this.activeIndex = this.items.findIndex(i => i.id === value);
        if (this.activeIndex === -1)
            throw new Error(`Active menu item ${value} was not found`);
    }

    public isActive(menuItem: IMenuItemModel): boolean {
        return menuItem.id === this.active;
    }

    constructor(items: IMenuItemModel[]) {
        this.items = items;
    }
}
