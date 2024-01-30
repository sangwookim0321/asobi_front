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
  </div>
    <Footer/>
</template>

<style>
.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
}

.main-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}

@media (max-width: 768px) {
}
</style>