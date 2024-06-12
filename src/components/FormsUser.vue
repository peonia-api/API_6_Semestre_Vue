<template>
  <UserBox background_color="white_color">
    <div class="send-image">
      <img src="@/assets/icons/Avatar_Icon_Black.png" alt="Inserir foto de perfil" />
    </div>
    <div class="Input-Texts">
      <div class="input-container">
        <InputText type="text" v-model="currentUser.name" placeholder="Nome Completo" />
      </div>
      <div class="input-container">
        <InputText type="text" v-model="currentUser.email" placeholder="E-mail" />
      </div>
    </div>
    <div class="Button-Container">
      <Button label="Atualizar" severity="contrast" @click="submitPutForm" />
      <Button label="Trocar Senha" severity="contrast" @click="goToAut" />
    </div>
  </UserBox>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import UserBox from '@/components/UserBox.vue';
import { onMounted, ref } from 'vue';
import type { UsuarioPefil } from "../interfaces/User";
import { avisoEditar } from '@/plugins/sweetalert';
import UsuarioStore from '@/stores/Usuario';
import { useRouter } from 'vue-router';

const { putUser } = UsuarioStore();
const router = useRouter();

const goToAut = () => {
  router.push({ name: 'autenticacao' });
};

const currentUser = ref<UsuarioPefil>({
  id: '',
  name: '',
  email: '',
  function: '',
  surname: ''
});

onMounted(async () => {
  const loadUserFromLocalStorage = () => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      Object.assign(currentUser.value, user);
    }
  };

  loadUserFromLocalStorage();
});

async function submitPutForm() {
  const result = await avisoEditar();
  if (result.isConfirmed) {
    try {
      await putUser(currentUser.value.id, currentUser.value);
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  }
}
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

.Button-Container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
</style>
