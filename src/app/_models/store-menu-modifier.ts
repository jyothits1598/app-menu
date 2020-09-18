import { StoreMenuItem } from './store-menu-items';
import { StoreMenuCategory } from './store-menu-category';
import { StoreMenu } from './store-menu';

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

export class StoreMenuModifierItem extends StoreMenuItem {
    modifierPrice: number;
    constructor(id: number, name: string, basePrice: number, categories: StoreMenuCategory[], modifierPrice: number) {
        super(id, name, basePrice, categories, null, null);
        this.modifierPrice = modifierPrice;
    }
}