import { TabItemType } from '@/utils/tabList.type'

// 设置导航
export const setTabs = (data: TabItemType[], value: string) => {
  if (value) {
    data.forEach((item: TabItemType) => (item.active = item.id === value))
  }
  sessionStorage.setItem('TABS_LIST', JSON.stringify(data))
}

// 获取导航
export const getTabs = () => {
  const result = sessionStorage.getItem('TABS_LIST')
  const tabList: Array<TabItemType | never> = result ? JSON.parse(result) : []
  return tabList
}

// 设置主题
export const setThemes = (data: any) => {
  localStorage.setItem('THEMES', JSON.stringify(data))
}

// 获取主题
export const getThemes = () => {
  let result = localStorage.getItem('THEMES')
  result = result
    ? JSON.parse(result)
    : {
      showBreadcrumb: true,
      showTabs: true
    }
  return result as any
}

// 设置面包屑
export const setBreadcrumb = (data: any) => {
  data = data || []
  data = data.reverse()
  sessionStorage.setItem('BREADCRUMB', JSON.stringify(data))
}

// 获取面包屑
export const getBreadcrumb = () => {
  let result = sessionStorage.getItem('BREADCRUMB')
  result = result ? JSON.parse(result) : []
  return result
}
