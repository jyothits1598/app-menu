import { StoreMenu } from './store-menu';

export class StoreMenuCategory {
    id: number;
    name: string;
    menus: Array<StoreMenu>

    constructor(id: number, name: string, menus: Array<StoreMenu>){
        this.id = id;
        this.name = name;
        this.menus = menus;
    }
}