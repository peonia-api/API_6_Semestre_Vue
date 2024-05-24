<template>
  <div class="title-cadastro-usuario">
    <p>Cadastro de Usuario</p>
  </div>
  <UserBox background_color="white_color">
    <div class="Input-Texts">
      <div v-if="hasError && !emailError" class="error-message">{{ errorMessage }}</div>
      <div class="input-container">
        <InputText type="text" v-model="userData.name" placeholder="Nome" />
      </div>
      <div class="input-container">
        <InputText type="text" v-model="userData.surname" placeholder="Sobrenome" />
      </div>
      <div class="input-container">
        <select v-model="userData.permissionType">
          <option value="" disabled>Autorizações</option>
          <option value="ROLE_ADMIN">Administrador</option>
          <option value="ROLE_MANAGER">Gerente</option>
          <option value="ROLE_GUARD">Guarda</option>
        </select>
      </div>
      <div v-if="emailError" class="error-message">{{ errorMessage }}</div>
      <div :class="{ 'input-error': emailError, 'input-container': true }">
        <InputText type="text" v-model="userData.email" placeholder="Usuário" :class="{ 'error-input': emailError }" />
      </div>
      <div class="input-container">
        <InputText type="password" v-model="userData.password" placeholder="Senha" />
      </div>
    </div>
    <div class="Register-Button">
      <Button label="Cadastrar" severity="contrast" @click="submitForm"></Button>
    </div>
  </UserBox>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import UserBox from '@/components/UserBox.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import UsuarioStore from '../stores/Usuario.ts'; 

const router = useRouter();
const { create } = UsuarioStore(); 

const userData = ref({
  name: '',
  surname: '',
  email: '',
  function: 'User',
  permissionType: '',
  password: ''
});

const emailError = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

const submitForm = async () => {
  try {
    hasError.value = false;
    errorMessage.value = '';
    emailError.value = false;

    if (!userData.value.name || !userData.value.surname || !userData.value.email || !userData.value.function || !userData.value.password || !userData.value.permissionType) {
      throw new Error('Todos os campos são obrigatórios');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userData.value.email)) {
      emailError.value = true;
      throw new Error('Email inválido. O campo deve conter @ e .com');
    }

    const newUser = { ...userData.value };
    await create(newUser);
    router.push("/userList");
  } catch (error) {
    hasError.value = true;
    errorMessage.value = error.message;
  }
};
</script>

<style scoped>
.title-cadastro-usuario {
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
}

.title-cadastro-usuario p {
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
}

.Register-Button {
  text-align: center;
  margin-top: 20px;
}

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
  align-items: center;
  margin-top: -20px;
  position:relative  
}

.input-container {
  margin-bottom: 15px; 
  position: relative;
  width: 250px;
  display: flex;
  justify-content: center;
}


.input-text {
  width: 80%;
}

.input-container select {
  padding: 8px;
  border-radius: 6px; 
  border: 1px solid #ccc; 
  font-family: inherit;
  font-size: medium;
  color: #334155;
  width: 250px;
}

.input-container select:focus {
  outline: none; 
}

.error-message {
  color: red;
  margin-bottom: 10px;
  text-align: center;
}

.email-error {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
}

.error-input {
  border-color: red;
}

.input-error {
  display: flex;
  flex-direction: column;
}
</style>
