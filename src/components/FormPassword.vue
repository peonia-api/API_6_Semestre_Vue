<template>
  <UserBox background_color="white_color">
    <div class="title-aut">
      <p>Nova Senha</p>
    </div>
    <div class="Input-Texts">
      <div class="input-container">
        <InputText type="text" v-model="authCode" placeholder="Código de Autenticação" />
      </div>
      <div class="input-container">
        <InputText type="password" v-model="newPassword" placeholder="Nova Senha" />
      </div>
      <div class="input-container">
        <InputText type="password" v-model="confirmPassword" placeholder="Confirmar Senha" />
      </div>
    </div>
    <div class="Register-Button">
      <Button label="Salvar" severity="contrast" @click="submitNewPassword" />
    </div>
  </UserBox>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import UserBox from '../components/UserBox.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ResetPasswordStore from '../stores/ResetPassword';
import { avisoErroPassword, avisoPassword } from '../plugins/sweetalert';

const resetPasswordStore = ResetPasswordStore();
const authCode = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const route = useRoute();
const router = useRouter();
const email = route.query.email as string;

const submitNewPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    avisoErroPassword('As senhas não coincidem ');
    return;
  }
  try {
    await resetPasswordStore.resetUserPassword(authCode.value, newPassword.value);
    await avisoPassword("Troca realizada com sucesso!");
    router.push({ name: 'loginScreenVue' });
  } catch (error) {
    console.error('Erro ao salvar nova senha');
    avisoErroPassword('Código de autenticação incorreto!');
  }
};
</script>


<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.title-aut {
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 10px;
}

.title-aut p {
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
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

.Register-Button {
  display: flex;
  justify-content: space-between;
}
</style>
