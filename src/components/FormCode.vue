<template>
  <UserBox background_color="white_color">
    <div class="title-aut">
      <p>Autenticação</p>
    </div>
    <div class="Input-Texts">
      <div class="input-container">
        <InputText type="text" v-model="email" placeholder="E-mail" />
      </div>
    </div>
    <div class="Register-Button">
      <Button label="Enviar Código" severity="contrast" @click="sendAuthCode" />
    </div>
  </UserBox>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import UserBox from '../components/UserBox.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ResetPasswordStore from '../stores/ResetPassword';
import { avisoErroPassword, avisoPassword } from '../plugins/sweetalert';

const resetPasswordStore = ResetPasswordStore();

const email = ref('');
const router = useRouter();

const sendAuthCode = async () => {
  try {
    await resetPasswordStore.requestPasswordReset(email.value);
    await avisoPassword("Enviado com sucesso!");
    router.push({ name: 'password', query: { email: email.value } });
  } catch (error) {
    await avisoErroPassword('Erro ao enviar código de autenticação.');
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
