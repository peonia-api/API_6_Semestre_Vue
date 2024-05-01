<template>
    <UserBox background_color="blue_color">
        <div class="send-image">
          <img src="@/assets/icons/Avatar_Icon.png" alt="Inserir foto de perfil" />
        </div>
        <div class="Input-Texts">
          <div class="input-container">
            <InputText type="text" v-model="value" placeholder="Nome Completo" />
          </div>
          <div class="input-container">
            <InputText type="text" v-model="value" placeholder="Função" />
          </div>
          <div class="input-container">
            <InputText type="text" v-model="value" placeholder="Nome de Usuário" />
          </div>
          <div class="input-container">
            <InputText type="password" v-model="value" placeholder="Senha" />
          </div>
        </div>
        <div class="Register-Button">
          <Button label="Cadastrar" severity="contrast" />
        </div>
    </UserBox>
  </template>
  
  <script setup>
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import UserBox from '@/components/UserBox.vue';
  </script>
  
  <style scoped>
  
  .send-image {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .send-image img {
    width: 110px;
    height: 110px;
    margin-bottom: 20px;
    margin-top: -40px;
  }
  
  .Input-Texts {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  
  .input-container {
    margin-bottom: 20px;
  }
  
  .input-text {
    width: 80%;
  }
  </style>
  