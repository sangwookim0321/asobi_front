import { createRouter, createWebHistory } from 'vue-router'

import DreamInterpretation from '../components/DreamInterpretation.vue'

const routes = [
    {
        path: '/',
        name: 'DreamInterpretation',
        component: DreamInterpretation
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router