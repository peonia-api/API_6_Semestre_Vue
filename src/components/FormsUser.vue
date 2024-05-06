<template>
  <UserBox background_color="blue_color">
    <div class="send-image">
      <img src="@/assets/icons/Avatar_Icon.png" alt="Inserir foto de perfil" />
    </div>
    <div class="Input-Texts">
      <div class="input-container">
        <InputText type="text" v-model="currentUser.name" placeholder="Nome Completo" />
      </div>
      <div class="input-container">
        <InputText type="text" v-model="currentUser.email" placeholder="E-mail" />
      </div>
      <div class="input-container">
        <InputText type="text" v-model="currentUser.function" placeholder="Função" />
      </div>
    </div>
    <div class="Register-Button">
      <Button label="Atualizar" severity="contrast" />
    </div>
  </UserBox>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import UserBox from '@/components/UserBox.vue';
import { onMounted, ref } from 'vue';
import type { UsuarioPefil } from "../interfaces/User";
import UsuarioStore from '../stores/Usuario';


const registroUser = UsuarioStore();


const currentUser = ref<UsuarioPefil>({
  name: '',
  email: '',
  function: '',
  surname: ''
});

const fudeuu= async () => {
  try {
    const user = await registroUser.fetchCurrentUser();
    console.log(user);
    
    Object.assign(currentUser.value, user); 
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
  }
};

onMounted(() => {
  fudeuu();
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