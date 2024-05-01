<template>
  <UserBox background_color="blue_color">
    <div class="Input-Texts">
      <div class="input-container">
        <InputText type="text" v-model="userData.name" placeholder="Nome" />
      </div>
      <div class="input-container">
        <InputText type="text" v-model="userData.surname" placeholder="Sobrenome" />
      </div>
      <div class="input-container">
        <InputText type="text" v-model="userData.email" placeholder="Usuário" />
      </div>
      <div class="input-container">
        <InputText type="text" v-model="userData.function" placeholder="Função" />
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
  function: '',
  password: ''
});

const submitForm = async () => {
  try {
    await create(userData.value);
  } catch (error) {
    console.log(error);
  } finally {
    router.push("/");
  }
};
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
