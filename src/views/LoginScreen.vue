<template>
<div class="content"> 
    <UserBox background_color="gray_color">
      <div class="AltaveIcon">
        <img src="@/assets/icons/Altave_Photoroom.png" />
      </div>
      <div class="Input-Texts">
        <div class="input-container">
          <InputText type="text" v-model="userValue" placeholder="Usuário" />
        </div>
      </div> 

     <div class="password-input">
        <InputText
        v-model="passwordValue" :type="showPassword ? 'text' : 'password'"
        placeholder="Senha"
        class="password-input"
       ></InputText>

       <i class="pi" :class="showPassword ? 'pi-eye' : 'pi-eye-slash'"
       @click="togglePasswordVisibility"
       style="cursor: pointer;"
       ></i>
     </div>

     <div class="acessar">
       <Button  @click="goToUserList" label="Acessar" severity="contrast" rounded ></Button>
     </div>
    </UserBox>
</div>  
   
</template>

<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import UserBox from '@/components/UserBox.vue';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter()

const passwordValue = ref('');
const showPassword = ref(false);

const goToUserList = () => {
  router.push("/userList")
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
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
  margin-top: 10px;
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
</style>