import { createRouter, createWebHistory } from 'vue-router'

import Main from '../components/Main.vue'
import DreamInterpretation from '../components/DreamInterpretation.vue'
import Lotto from '../components/Lotto.vue'
import Chat from '../components/Chat.vue'
import Mbti from '../components/Mbti.vue'
import Beta from '../components/Beta.vue'

const routes = [
    {
        path: '/:catchAll(.*)',
        redirect: '/',
    },
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/bata-ai-kadan',
        name: 'Beta',
        component: Beta
    },
    {
        path: '/ai-dream-interpretation',
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
    },
    {
        path: '/ai-mbti-test',
        name: 'Mbti',
        component: Mbti
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router