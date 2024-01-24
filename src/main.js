import App from './App.vue'
import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import store from './store'
import { LoadingPlugin} from "vue-loading-overlay"

import api from '@/commonJs/api.js'

const app = createApp(App)

api(app.config.globalProperties)

app
    .use(store)
    .use(LoadingPlugin)
    .use(router)
    .mount('#app')
