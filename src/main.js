import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElButton, ElContainer, ElForm, ElFormItem, ElInput } from 'element-plus';
import 'element-plus/dist/index.css'
import './assets/scss/common.scss'

import { getCookie } from '../utils/index'

const app = createApp(App)
//app.config.globalProperties.$ELEMENT = option
//app.use(ElementPlus)
app.use(ElButton);
app.use(ElContainer)
app.use(ElForm)
app.use(ElFormItem)
app.use(ElInput)

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/register') {
        next()
    } else {
        if (!getCookie('userCookie')) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})

app.use(store).use(router).mount('#app')
