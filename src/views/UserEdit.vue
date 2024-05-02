<template>
  <div class="title-ocorrencias">
    <p>Editar Usuario</p>
  </div>
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
    </div>
    <div class="Register-Button">
      <Button label="Editar" severity="contrast" @click="submitPutForm"></Button>
    </div>
  </UserBox>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import UserBox from '@/components/UserBox.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import UsuarioStore from '../stores/Usuario.ts';

const router = useRouter();
const { findByIdUser, putUser } = UsuarioStore();
const route = useRoute();

const userId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const userData = ref({
  name: '',
  surname: '',
  email: '',
  function: '',
  password: '',
  authorizations: [{ name: 'ROLE_ADMIN' }] 
});

async function getUser() {
  try {
    const response = await findByIdUser(userId);
    userData.value = { ...response }; 
    console.log('Sucesso ao buscar informações do usuário!');
  } catch (error) {
    console.log('Erro ao buscar informações do usuário:', error);
  }
}

const submitPutForm = async () => {
  try {
    await putUser(userId, userData.value);
    router.push("/userList");
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
  }
};

onMounted(async () => {
  await getUser();
});
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
