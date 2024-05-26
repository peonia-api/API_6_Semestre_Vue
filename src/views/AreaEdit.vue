<template>
  <div class="title-edit-area">
      <p>Editar Área</p>
  </div>
  <UserBox background_color="white_color">
      <div class="Input-Texts">
          <div class="input-container">
              <InputText type="text" v-model="areaData.name" placeholder="Nome" />
          </div>
          <div class="input-container">
              <InputText type="text" v-model="areaData.description" placeholder="Descrição" />
          </div>
          <div class="input-container">
            <select class="input-select" v-model="areaData.user.id">
              <option value="" disabled>Gerente Responsável</option>
              <option v-for="user in usersRole" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
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
import AreaStore from '../stores/Area';
import UsuarioStore from '../stores/Usuario';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { avisoEditar, avisoVoltar } from '../plugins/sweetalert';

const router = useRouter();
const { findByIdArea, putArea } = AreaStore();
const registroUser = UsuarioStore();
const route = useRoute();
const areaId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
const areaData = ref({
  name: '',
  description: '',
  user: {
    id: ''
  }
});
const usersRole = ref([]);

const fetchUsers = async () => {
  try {
    await registroUser.getAllUsers();
    usersRole.value = registroUser.users.filter(user => user.permissionType === 'ROLE_MANAGER');
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
};

async function getArea() {
  try {
    const response = await findByIdArea(areaId);
    areaData.value = { ...response };
  } catch (error) {
    console.error('Erro ao buscar informações da área:', error);
  }
}

onMounted(async () => {
  await getArea();
  fetchUsers();
});

async function submitPutForm() {
  const result = await avisoEditar();
  if (result.isConfirmed) {
    try {
      await putArea(areaId, areaData.value);
      router.push("/areaList");
    } catch (error) {
      console.error('Erro ao editar área:', error);
    }
  }
}

async function submitVoltar() {
  const result = await avisoVoltar();
  if (result.isConfirmed) {
    router.push("/areaList");
  }
}
</script>



<style scoped>
.title-edit-area {
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
}

.title-edit-area p {
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


.button-edit {
    margin: 25px;
}
</style>