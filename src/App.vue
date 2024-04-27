<template>
  <v-app>
    <!-- Renderiza Navbar e Footer apenas se não estiver na rota de login -->
    <Navbar v-if="!state.isLoginScreen" />
    <div class="container">
      <RouterView class="router-view-container" />
    </div>
    <Footer v-if="!state.isLoginScreen" />
  </v-app>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { ref, watch } from 'vue';

const route = useRoute();

const state = ref({
  isLoginScreen: false,
})

watch(
  () => route.name, 
  (newRoute, oldRoute) => {
    console.log({newRoute, oldRoute})
    state.value.isLoginScreen = newRoute == 'loginScreenVue';
  }
);


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
