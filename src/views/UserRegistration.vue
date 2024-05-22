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
        <InputText type="text" v-model="userData.function" placeholder="Função" />
      </div>
      <div class="input-container">
        <select v-model="userData.permissionType">
          <option value="" disabled>Autorizações</option>
          <option value="ROLE_ADMIN">Administrador</option>
          <option value="ROLE_MANAGER">Gerente</option>
          <option value="ROLE_GUARD">Guarda</option>
        </select>
      </div>
      <div class="input-container">
        <InputText type="text" v-model="userData.email" placeholder="Usuário" />
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
  permissionType: '',
  password: ''
});

const submitForm = async () => {
  try {
    if (!userData.value.name || !userData.value.surname || !userData.value.email || !userData.value.function || !userData.value.password || !userData.value.permissionType) {
      throw new Error('Todos os campos são obrigatórios');
    }
    const newUser = { ...userData.value };
    console.log(newUser);
    console.log(newUser);
    await create(newUser);
    router.push("/userList");
  } catch (error) {
    console.error(error.message);
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
.input-container {
  margin-bottom: 20px;
}

.input-container select {
  width: 100%;
  padding: 8px;
  border-radius: 6px; 
  border: 1px solid #ccc; 
  font-family: inherit;
  font-size: medium;
  color: #334155;
}

.input-container select:focus {
  outline: none; 
}


</style>
