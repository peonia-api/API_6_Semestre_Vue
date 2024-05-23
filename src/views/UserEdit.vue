<template>
  <div class="title-edit-usuario">
    <p>Edição de Usuario</p>
  </div>
  <UserBox background_color="white_color">
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
      <Button label="Voltar" class="button-edit" severity="contrast" @click="submitVoltar"></Button>
      <Button label="Editar" class="button-edit" severity="contrast" @click="submitPutForm"></Button>
    </div>
  </UserBox>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import UserBox from '@/components/UserBox.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import UsuarioStore from '../stores/Usuario';
import { avisoEditar, avisoVoltar } from '../plugins/sweetalert';

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

onMounted(async () => {
  await getUser();
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

async function submitPutForm() {
  const result = await avisoEditar();
  if (result.isConfirmed) {
    try {
      await putUser(userId, userData.value);
      router.push("/userList");
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  }
}
async function submitVoltar() {
  const result = await avisoVoltar();
  if (result.isConfirmed) {
    router.push("/userList");
  }
}
</script>


  

<style scoped>
.title-edit-usuario {
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
}

.title-edit-usuario p {
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
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
  margin-top: 20px;
}

.input-container {
  margin-bottom: 20px;
}

.input-text {
  width: 80%;
}

.button-edit{
  margin: 25px;
}
</style>
