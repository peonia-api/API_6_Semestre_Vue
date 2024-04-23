<template>
  <v-app>

    <Navbar />
      <div class="container">
        <RouterView class="router-view-container" />
      </div>
    <Footer />
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>


<style>
  .container {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -8vh;
  }

</style>
