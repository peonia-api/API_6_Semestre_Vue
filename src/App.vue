<template>
  <v-app>

    <Navbar />
    <div class="content-container">
        <RouterView />
      </div>
    <Footer />
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>


<style scoped>
.content-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      min-height: calc(100vh - 150px); 
      width: 100%;
  
}
</style>
