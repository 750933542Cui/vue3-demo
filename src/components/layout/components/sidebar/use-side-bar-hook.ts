import { reactive, toRefs, computed, watch, onMounted } from 'vue'
import { useRouter, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex'
import { getTabs } from '@utils/storage'
import { setBreadcrumb } from '@utils/storage'
import { MenuItemType } from '@/utils/tabList.type'

// @ts-ignore
export function useSideBarHook(props) {
    const { options } = useRouter()
    const store = useStore()
    const collapse = props.collapse
    const data = reactive<{ activeMenu: string; menuList: MenuItemType[] }>({
        activeMenu: '',
        menuList: [
            {
                menuId: '111',
                menuName: '导航一',
                path: '',
                children: [
                    { menuId: '111-1', menuName: '选项1', path: '', children: [] },
                    { menuId: '111-2', menuName: '选项2', path: '', children: [] },
                    { menuId: '111-3', menuName: '选项3', path: '', children: [] },
                    {
                        menuId: '111-4',
                        menuName: '这是选项4哦',
                        path: '',
                        children: [
                            {
                                menuId: '111-4-1',
                                menuName: '这是选项4-1哦',
                                path: '/',
                                children: []
                            },
                            {
                                menuId: '111-4-2',
                                menuName: '这是选项4-2哦',
                                path: '/',
                                children: [
                                    {
                                        menuId: '111-4-2-1',
                                        menuName: '这是选项4-2-1哦',
                                        path: '/',
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                menuId: '222',
                menuName: '导航二',
                path: '',
                children: [
                    { menuId: '222-1', menuName: '导航二1', path: '/', children: [] },
                    { menuId: '222-2', menuName: '导航二2', path: '/', children: [] },
                    { menuId: '222-3', menuName: '导航二3', path: '/', children: [] },
                    {
                        menuId: '222-4',
                        menuName: '导航二4',
                        path: '',
                        children: [
                            {
                                menuId: '222-4-1',
                                menuName: '导航二4-1',
                                path: '',
                                children: [
                                    {
                                        menuId: '222-4-1-1',
                                        menuName: '导航二4-1-1',
                                        path: '/',
                                        children: []
                                    }
                                ]
                            },
                            {
                                menuId: '222-4-2',
                                menuName: '导航二4-2',
                                path: '/',
                                children: []
                            }
                        ]
                    }
                ]
            },
            { menuId: '333', menuName: '导航三', path: '/', children: [] },
            { menuId: '444', menuName: '导航四', path: '/', children: [] },
            {
                menuId: '555',
                menuName: '导航五',
                path: '',
                children: [{ menuId: '555-1', menuName: '导航五-1', path: '/', children: [] }]
            }
        ]
    })

    onMounted(() => {
        getMenuList()
    })

    const createMenu = (menus: RouteRecordRaw[]): MenuItemType[] => {
        return menus.map(menu => {
            return {
                menuId: `${menu.path}`,
                menuName: menu.name as string,
                path: menu.path,
                children: menu.children ? createMenu(menu.children!) : []
            }
        })
    }

    const getMenuList = () => {
        data.menuList = createMenu(options.routes[0].children!)
    }

    // 是否显示Logo
    const isShowLogo = computed(() => {
        return props.showLogo
    })

    // 是否折叠菜单
    const isCollapse = computed(() => {
        if (props.collapse) {
            return collapse
        } else {
            return store.state.isCollapse
        }
    })

    const _tabs = getTabs()
    _tabs.forEach((item) => {
        if (item.active) data.activeMenu = item.id
    })

    const _getParentMenu = (list: MenuItemType[], id: string) => {
        for (let i in list) {
            if (list[i].menuId == id) {
                return [list[i]]
            }
            if (list[i].children) {
                let node: MenuItemType[] = _getParentMenu(list[i].children, id)!
                if (node !== undefined) {
                    return node.concat(list[i])
                }
            }
        }
    }
    setBreadcrumb(_getParentMenu(data.menuList, data.activeMenu))

    watch(
        () => store.state.activeMenu,
        (value) => {
            data.activeMenu = value
            setBreadcrumb(_getParentMenu(data.menuList, value))
        }
    )

    const params = toRefs(data)
    return {
        ...params,
        isShowLogo,
        isCollapse
    }
}