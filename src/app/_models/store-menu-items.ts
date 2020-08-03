import { StoreMenuCategory } from './store-menu-category';

export class StoreMenuItem{
    id: number;
    name: string;
    basePrice: number;
    categories: Array<StoreMenuCategory>
    constructor(id: number, name: string, basePrice: number, categories: Array<StoreMenuCategory>){
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.categories = categories;
    }
}