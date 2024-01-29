<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

import { ref, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const appRoute = ref(route.path)

watchEffect(() => {
    appRoute.value = route.path
})
</script>

<template>
  <div class="app">
    <Header v-if="appRoute !== '/'"/>
    <router-view/>
  </div>
  <Footer/>
</template>

<style>
.app {
    display: flex;
    flex-direction: column;
    max-width: 1440px;
    min-width: 100%;
    margin: 0 auto;
}

@media (max-width: 768px) {

}
</style>
