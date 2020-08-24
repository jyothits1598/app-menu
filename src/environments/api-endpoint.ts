export function consolidatedMenuListUrl(storeId) {
    return `store/category/menu/${storeId}`;
}

export function CategoryiesWithItemsForMenu(menuId) {
    return `/api/menus/${menuId}/overview`;
}