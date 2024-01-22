import { createRouter, createWebHistory } from 'vue-router'

import DreamInterpretation from '../components/DreamInterpretation.vue'
import Lotto from '../components/Lotto.vue'
import Chat from '../components/Chat.vue'

const routes = [
    {
        path: '/',
        name: 'DreamInterpretation',
        component: DreamInterpretation
    },
    {
        path: '/ai-lotto',
        name: 'Lotto',
        component: Lotto
    },
    {
        path: '/ai-chat',
        name: 'Chat',
        component: Chat
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router