// 导航标签数据类型
export interface TabItemType {
    id: string;
    name: string;
    active: boolean;
}

export interface MenuItemType {
    menuId: string;
    menuName: string;
    path: string;
    children: Array<MenuItemType | never>;
}














