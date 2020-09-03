export function URL_StoreDetail(storeId) {
    return `api/stores/${storeId}/approvaldata`;
}

export function URL_ApproveStore(storeId) {
    return `api/stores/${storeId}/approve`;
}

export function URL_RejectStore(storeId) {
    return `api/stores/${storeId}/reject`;
}

export function URL_StoreClaimSearch(term: string){
    return `api/stores?q=${term}`;
}

export function URL_StoreBasicData(storeId){
    return `api/stores/${storeId}/storedata`
}

export function URL_StoreBankData(storeId){
    return `api/stores/${storeId}/bankaccount`
}

export const URL_StoreImage = 'store/logo';