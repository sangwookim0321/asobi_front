<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
</script>

<template>
  <div class="app">
    <Header/>
    <router-view/>
  </div>
  <Footer/>
</template>

<style>
.app {
    display: flex;
    flex-direction: column;
    max-width: 1440px;
    min-width: 100vw;
    margin: 0 auto;
}

@media (max-width: 768px) {

}
</style>
