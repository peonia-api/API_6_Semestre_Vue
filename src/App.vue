<template>
      <div>
        <Navbar />
        <div class="content-container">
          <RouterView />
        </div>
        <Footer />
      </div>
    </template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>
.content-container {
      display: flex;
      align-items: center;
      justify-content: center;
}


</style>