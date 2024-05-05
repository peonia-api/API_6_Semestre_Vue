<template>
  <div class="content">
    <UserBox background_color="gray_color">
      <div class="AltaveIcon">
        <img src="@/assets/icons/Altave_Photoroom.png" />
      </div>
      <div class="Input-Texts">
        <div class="input-container">
          <div v-if="hasError" class="error-message" style="color: red;">{{ errorMessage }}</div>
          <InputText
            type="text"
            v-model="userValue"
            placeholder="Usuário"
            :class="{ 'error-input': hasError }"
          />
        </div>
      </div>

      <div class="password-input">
        <InputText
          v-model="passwordValue"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Senha"
          :class="{ 'error-input': hasError }"
        />
      
        <i
          class="pi"
          :class="showPassword ? 'pi-eye' : 'pi-eye-slash'"
          @click="togglePasswordVisibility"
          style="cursor: pointer;"
        ></i>
      </div>

      <div class="acessar">
        <Button label="Acessar" severity="contrast" rounded @click="handleLogin"></Button>
      </div>
    </UserBox>
  </div>
</template>



<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import UserBox from '@/components/UserBox.vue';
import Button from 'primevue/button';

import { useAuthStore } from '../stores/Login.ts';
import { useRouter } from 'vue-router';

const router = useRouter()

const userValue = ref('');
const passwordValue = ref('');
const showPassword = ref(false);
const hasError = ref(false);
const errorMessage = ref('');



const { login } = useAuthStore();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  try {
    await login(userValue.value, passwordValue.value);
    router.push("/");
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    hasError.value = true;
    errorMessage.value = 'Usuário ou senha inválidos';
     }
   };
</script>


<style scoped>
.content {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 51, 101, 1); 
}

.AltaveIcon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.AltaveIcon img {
  width: 330px;
  height: 180px;
  margin-bottom: 20px;
  margin-top: -30px;
}
.Input-Texts {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.input-container {
  margin-bottom: 20px;
}

.input-text {
  width: 80%;
}

.acessar {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.acessar button {
  margin: 0 3px;
  background-color: rgba(0, 51, 101, 1);
  height: 35px;
  width: 130px;
}
.password-input {
  position: relative;
}

.pi {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.error-input {
  border-color: red;
}
</style>