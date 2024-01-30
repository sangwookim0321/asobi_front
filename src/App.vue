<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const appRoute = ref(route.path)

watchEffect(() => {
    appRoute.value = route.path
})
</script>

<template>
  <div class="app">
    <Header v-if="appRoute !== '/'"/>
    <div class="main-content">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<style>
.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* 전체 화면 높이 */
    width: 100%;
    max-width: 1440px; /* 최대 너비 설정 */
    margin: 0 auto; /* 중앙 정렬 */
}

.main-content {
    flex: 1; /* 남은 공간 모두 사용 */
}

@media (max-width: 768px) {
    /* 모바일 환경에서의 추가적인 스타일링 */
}
</style>