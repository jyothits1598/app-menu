import { StoreMenuItem } from './store-menu-items';
import { StoreMenuCategory } from './store-menu-category';

export class StoreMenuModifier {
    id: number;
    name: string;
    selectionRequired: boolean;
    maxItemsSelectable: number;
    items: Array<StoreMenuModifierItem>
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    itemsToString(): string {
        let result = "";

        if (!this.items || this.items.length == 0) return "";
        result += this.items[0].name;

        if (!this.items[1]) return result;
        result += ', ' + this.items[1]

        if (!this.items[2]) return result;
        result += ', ' + this.items[2]

        if (this.items[3])
            result += `, +${this.items.length - 2}`
    }
};

export class StoreMenuModifierItem extends StoreMenuItem {
    modifierPrice: number;
    constructor(id: number, name: string, basePrice: number, categories: StoreMenuCategory[], modifierPrice: number) {
        super(id, name, basePrice, categories, null, null);
        this.modifierPrice = modifierPrice;
    }
}

export function ReadStoreMenuModifier(data: any): StoreMenuModifier {
    let mod = new StoreMenuModifier(data.modifier_id, data.modifier_name)
    mod.selectionRequired = data.required_selection ? true : false;
    mod.maxItemsSelectable = data.max_items_selected;
    mod.items = [];
    data.item_details.forEach(item => {
        mod.items.push(new StoreMenuModifierItem(item.item_id, item.item_name, item.item_base_price, null, item.modifier_price))
    });
    return mod;
}