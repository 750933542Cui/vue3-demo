import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import { defineAsyncComponent } from 'vue'
import Layout from '@components/layout/index.vue'
import CommonPage from '@components/layout/common/index.vue'

const pages = import.meta.glob('@/pages/**/index.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        redirect: "/typeScript",
        children: []
    }
]

const joinToRouterTree = (pathList: string[], routes: RouteRecordRaw[], Component: any, index: number = 0) => {
    const name = pathList[index]
    let curRoute = routes.find(item => name === item.path.slice(name.length))
    if (!curRoute) {
        const isLastRoute = index === pathList.length - 2
        curRoute = {
            name,
            path: '/' + pathList.slice(0, index + 1).join('/'),
            component: isLastRoute ? Component : CommonPage,
            children: []
        }
        routes.push(curRoute)
    }
    index++;
    if (index < pathList.length - 1) {
        joinToRouterTree(pathList, curRoute.children!, Component, index)
    }

}

Object.keys(pages).map(path => {
    const pathList = path.slice(11).split('/')
    if (pathList.length > 1) {
        joinToRouterTree(pathList, routes[0].children!, pages[path], 0)
    }
})

console.log(routes)

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
