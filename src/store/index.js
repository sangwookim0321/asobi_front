import { createStore } from 'vuex'
import useApi from "@/commonJs/useApi.js"

export default createStore({
    state: {

    },
    mutations: {

    },
    actions: {
        async fetchData({ commit }, payload) {
            const { httpGet } = useApi()

            try {
                const data = await httpGet(/* 파라미터... */)
                commit('someMutation', data)
            } catch (error) {
                console.error(error)
                // 에러 처리...
            }
        }
    },
})