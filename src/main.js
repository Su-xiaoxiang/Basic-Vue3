import '@/styles/input.css' //总体样式
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 使用Vant
import Vant from 'vant'
app.use(Vant)
//使用EElementPlus
app.use(ElementPlus)
//使用Pinia和router
app.use(createPinia())
app.use(router)

app.mount('#app')
