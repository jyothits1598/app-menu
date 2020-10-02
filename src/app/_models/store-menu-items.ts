import { StoreMenuCategory } from './store-menu-category';
import { StoreMenu } from './store-menu';
import { StoreMenuModifier } from './store-menu-modifier';

export class StoreMenuItem {

    id: number;
    name: string;
    basePrice: number;
    categories: Array<StoreMenuCategory>
    image: string;
    menus: Array<StoreMenu>;
    modifiers: Array<StoreMenuModifier>

    constructor(id: number, name: string, basePrice: number, categories: Array<StoreMenuCategory> = null, menus: Array<StoreMenu> = null, modifiers: Array<StoreMenuModifier> = null) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.categories = categories;
        this.menus = menus;
        this.modifiers = modifiers;
    }
}

export function ReadItems(data: any): StoreMenuItem {
    let cats = new Array<StoreMenuCategory>();
    data.category_details.forEach(cat => {
        cats.push(new StoreMenuCategory(cat.category_id, cat.category_name, null))
    });
    let menus = new Array<StoreMenu>();
    data.menu_details.forEach(menu => {
        menus.push(new StoreMenu(menu.menu_id, menu.menu_name, menu.is_custom_availability, null))
    });
    let mods = new Array<StoreMenuModifier>();
    data.modifiers_details.forEach(mod => {
        mods.push(new StoreMenuModifier(mod.modifier_id, mod.modifier_name))
    });
    return new StoreMenuItem(data.item_id, data.item_name, data.item_base_price, cats, menus, mods);
}