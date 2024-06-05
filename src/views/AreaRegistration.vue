<template>
  <div class="title-area-cadastro">
    <p>Cadastro de Área</p>
  </div>
  <UserBox background_color="white_color">
    <div class="Input-Texts">
      <div v-if="hasError" class="error-message">{{ errorMessage }}</div>
      <div class="input-container">
        <InputText type="text" v-model="userArea.name" placeholder="Nome" />
      </div>
      <div class="input-container">
        <InputText type="text" v-model="userArea.description" placeholder="Descrição" />
      </div>
      <div>
        <select class="input-select" v-model="userArea.user.id">
          <option value="" disabled>Gerente Responsável</option>
          <option v-for="user in usersRole" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
    </div>
    <div class="Register-Button">
      <Button label="Cadastrar" severity="contrast" @click="submitForm"></Button>
    </div>
  </UserBox>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import UserBox from '@/components/UserBox.vue';

import UsuarioStore from '../stores/Usuario';
import AreaStore from '../stores/Area.ts';

const router = useRouter();
const { create } = AreaStore();
const registroUser = UsuarioStore();
const hasError = ref(false);
const errorMessage = ref('');

const usersRole = ref([]);

const fetchUsers = async () => {
  try {
    await registroUser.getAllUsers();
    usersRole.value = registroUser.users.filter(user => user.permissionType === 'ROLE_MANAGER');
    console.log(usersRole.value);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
};

onMounted(() => {
  fetchUsers();
});

const userArea = ref({
  name: '',
  description: '',
  user: {
    id: ''
  }
});

const submitForm = async () => {
  try {
    hasError.value = false;
    errorMessage.value = '';

    if (!userArea.value.name || !userArea.value.description || !userArea.value.user.id) {
      throw new Error('Todos os campos são obrigatórios');
    }

    await create(userArea.value);
    router.push("/areaList");
  } catch (error) {
    hasError.value = true;
    errorMessage.value = error.message;
  }
};
</script>

<style scoped>
.title-area-cadastro {
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
}

.title-area-cadastro p {
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
.input-select {
    width: 100%;
    border-radius: 5px;
    height: 37px;
    margin-bottom: 20px;
    font-size: 1rem;
    color: #334155
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