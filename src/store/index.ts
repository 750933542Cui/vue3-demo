import { createStore } from 'vuex'
import { getThemes } from '@utils/storage'

interface StoreType {
  navbarType: string,
  isCollapse: boolean,
  activeMenu: string
}

const navbarType = getThemes()?.navbarType ?? '左侧菜单模式'
export default createStore({
  state: {
    navbarType: navbarType,
    isCollapse: false,
    activeMenu: ''
  },
  mutations: {
    // 获取导航栏类型
    getNavbarType(state: StoreType, data: string) {
      state.navbarType = data
    },

    // 获取菜单折叠
    getCollapse(state: StoreType, data: boolean) {
      state.isCollapse = data
    },

    // 获取当前选中菜单
    getActiveMenu(state: StoreType, data: string) {
      state.activeMenu = data
    }
  },
  actions: {},
  modules: {}
})
