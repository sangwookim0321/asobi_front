import App from './App.vue'
import './assets/main.css'

import { createApp } from 'vue'
import router from './router'

import api from './commonJs/api'

const app = createApp(App)

const cgp = app.config.globalProperties
api(cgp)

app
    .use(router)
    .mount('#app')
