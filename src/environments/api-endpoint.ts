export function consolidatedMenuListUrl(storeId) {
    return `store/category/menu/${storeId}`;
}

export function CategoryiesWithItemsForMenu(menuId) {
    return `/api/menus/${menuId}/overview`;
}

// admin urls
export const URL_AdminPendingStores = 'api/stores/pending';
export const URL_AdminApprovedStores = 'api/stores/approved';
export const URL_AdminDeleteStore = 'api/stores/delete-store';
