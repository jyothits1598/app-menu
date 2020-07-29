import { StoreMenu } from './store-menu';
import { StoreItem } from '../services/store-item';

export class StoreMenuCategory {
    id: number;
    name: string;
    menus: Array<StoreMenu>
    items: Array<StoreItem>

    constructor(id: number, name: string, menus: Array<StoreMenu>){
        this.id = id;
        this.name = name;
        this.menus = menus;
    }
}