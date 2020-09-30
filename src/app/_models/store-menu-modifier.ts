import { StoreMenuItem } from './store-menu-items';

export class StoreMenuModifier {
    id: number;
    name: string;
    minimum: number;
    maximum: number;
    free: number;
    options: Array<ModifierOption>
    items: Array<StoreMenuItem>

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
};

export class ModifierOption{
    id: number;
    name: string;
    price: number;

    constructor(id: number, name: string, price: number){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}