export class Store {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
    address: string;
    logo: string;
    cuisineType: string;
    faceBookUrl: string;
    googleUrl: string;
    constructor(id: number, name: string, isActive: boolean){
        this.id = id;
        this.name = name;
        this.isActive = isActive;
    }
}

export function ReadStore(data: any): Store{
    let store = new Store(data.store_id, data.store_name, true);
    store.description = data.description;
    store.faceBookUrl = data.facebook_url;
    store.googleUrl = data.google_business_url;
    store.address = data.store_address;
    store.logo = data.store_logo;
    return store;
}