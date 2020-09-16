// get
export function URL_AllStoreMenuModifiers(storeId: number){
    return `modifiers/${storeId}/all`;
}

// get
export function URL_StoreMenuModifier(storeId: number, modifierId: number){
    return `modifiers/${storeId}/${modifierId}`;
}

// post
export const URL_CreateStoreMenuModfier = 'modifiers'