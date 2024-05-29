import { createApp } from 'vue'
import router from '@router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import VueForm from '@lljj/vue3-form-element'

import 'element-plus/dist/index.css'
import '@/style/layout.less'
import '@/style/custom.less'

import SvgIcon from '@components/SvgIcon.vue'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.component('SvgIcon', SvgIcon)
app.component('VueForm', VueForm)

app.mount('#app')
