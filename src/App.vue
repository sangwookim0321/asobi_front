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
    height: 100vh;
    margin: 0 auto;
}
</style>
