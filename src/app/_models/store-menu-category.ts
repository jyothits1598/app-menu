import { StoreMenu } from './store-menu';
import { StoreItem } from '../services/store-item';
import { StoreMenuItem } from './store-menu-items';

export class StoreMenuCategory {
    id: number;
    name: string;
    menus: Array<StoreMenu>
    items: Array<StoreItem>

    constructor(id: number, name: string, menus: Array<StoreMenu> = null, items: Array<StoreMenuItem>= null){
        this.id = id;
        this.name = name;
        this.menus = menus;
        this.items = items;
    }
}