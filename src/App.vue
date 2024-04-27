<template>
  <v-app>
    <!-- Renderiza Navbar e Footer apenas se não estiver na rota de login -->
    <Navbar v-if="shouldRenderNavbar" />
    <div class="container">
      <RouterView class="router-view-container" />
    </div>
    <Footer v-if="shouldRenderFooter" />
  </v-app>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const isLoginRoute = route.name === 'LoginRoute';

const shouldRenderNavbar = !isLoginRoute;
const shouldRenderFooter = !isLoginRoute;
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
