export class StoreMenuModifier{
    id: number;
    name: string;
    selectionRequired: boolean;
    maxItemsSelectable: number;
    items: Array<{itemId: number, modifierPrice: number}>
    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }
}