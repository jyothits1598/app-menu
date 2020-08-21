import { StoreMenuCategory } from './store-menu-category';
import { StoreMenu } from './store-menu';
import { StoreMenuModifier } from './store-menu-modifier';

export class StoreMenuItem{
    id: number;
    name: string;
    basePrice: number;
    categories: Array<StoreMenuCategory>
    menus: Array<StoreMenu>;
    modifiers: Array<StoreMenuModifier>
    constructor(id: number, name: string, basePrice: number, categories: Array<StoreMenuCategory>=null, menus: Array<StoreMenu>=null, modifiers: Array<StoreMenuModifier>=null){
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.categories = categories;
        this.menus = menus;
        this.modifiers = modifiers;
    }
}