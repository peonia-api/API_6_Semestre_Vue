<template>
  <div class="title-redzones">
    <p>Cadastro de Redzones</p>
  </div>
  <UserBox background_color="white_color" class="box_style">
    <div class="Input-Texts">
      <div class="error-container">
        <div v-if="hasError" class="error-message">{{ errorMessage }}</div>
        <div v-else class="placeholder-error-message"></div>
      </div>
      <FloatLabel class="field">
        <InputText class="input-field" id="nomeredzone" v-model="redzoneData.name" />
        <label for="nomeredzone">Nome</label>
      </FloatLabel>

      <FloatLabel class="field">
        <InputText class="input-field" id="descricao" v-model="redzoneData.description" />
        <label for="descricao">Descrição</label>
      </FloatLabel>

      <FloatLabel class="field">
        <InputText class="input-field" id="cameraSpot" v-model="redzoneData.cameraSpot" />
        <label for="cameraSpot">Localização da câmera(URL)</label>
      </FloatLabel>

      <FloatLabel class="field">
        <Dropdown class="DropDown-style" v-model="selectedArea" inputId="id-area" :options="areasDados" optionLabel="name"/>
        <label for="id-area">Área</label>
      </FloatLabel>

      <FloatLabel class="field">
        <Dropdown class="DropDown-style" v-model="selectedGuard" inputId="id-guard" :options="filteredGuards" optionLabel="name"/>
        <label for="id-guard">Guarda</label>
      </FloatLabel>

      <FloatLabel class="field" style="margin-top: 10px">
        <InputNumber class="input-field" id="capmaximaredzone" v-model="redzoneData.personLimit" />
        <label for="capmaximaredzone">Capacidade Máxima</label>
      </FloatLabel>

      <div class="Register-Button">
        <Button label="Cadastrar" severity="contrast" @click="submitForm" class="register-button-style"></Button>
      </div>
    </div>
  </UserBox>
</template>

<script setup lang="ts">
import UserBox from '../components/UserBox.vue';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

import RedzoneStore from '../stores/Redzone';
import UsuarioStore from '../stores/Usuario';
import AreaStore from '../stores/Area';

import type { Area } from '../interfaces/Area';
import type { Usuario } from "../interfaces/User";

const router = useRouter();
const { create } = RedzoneStore();
const registroUser = UsuarioStore();

const redzoneData = ref({
  id: '',
  name: '',
  description: '',
  cameraSpot: '',
  personLimit: 0,
  responsibleGuard: 'Gerente Responsavel',
  area: { id: '' },
  user: { id: '' }
});

const areasDados = ref<Area[]>([]);
const usersDados = ref<Usuario[]>([]);
const selectedArea = ref<Area | null>(null);
const selectedGuard = ref<Usuario | null>(null);
const filteredGuards = ref<Usuario[]>([]);

const hasError = ref(false);
const errorMessage = ref('');

const registroArea = AreaStore();

const fetchUsers = async () => {
  try {
    await registroUser.getAllUsers();
    usersDados.value = registroUser.users;

    filteredGuards.value = usersDados.value.filter(user => user.permissionType === 'ROLE_GUARD');
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
};

const fetchAreas = async () => {
  try {
    await registroArea.getAllareas();
    areasDados.value = registroArea.areas;    
  } catch (error) {
    console.error('Erro ao buscar áreas:', error);
  }
};

onMounted(() => {
  fetchUsers();
  fetchAreas();
});

const submitForm = async () => {
  hasError.value = false;
  errorMessage.value = '';

  if (!redzoneData.value.name || 
      !redzoneData.value.description || 
      !redzoneData.value.cameraSpot || 
      !redzoneData.value.personLimit || 
      !selectedArea.value || 
      !selectedGuard.value) {
    hasError.value = true;
    errorMessage.value = 'Todos os campos são obrigatórios';
    return;
  }

  redzoneData.value.area.id = selectedArea.value.id;
  redzoneData.value.user.id = selectedGuard.value.id;

  try {
    await create(redzoneData.value);
    router.push("/");
  } catch (error) {
    hasError.value = true;
    errorMessage.value = 'Erro ao criar Redzone';
    console.error('Erro ao criar Redzone:', error);
  }
};
</script>

<style scoped>
.title-redzones {
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 30px;
}

.title-redzones p {
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
}

.Input-Texts {
  display: flex;
  flex-direction: column;
  margin-top: -30px;
}

.input-container {
  margin-bottom: 20px;
}

.Input-Text {
  width: 80%;
}

.FloatLabel {
  position: relative;
}

.field {
  margin-bottom: 25px;
}

.input-field {
  width: 430px;
}

.Register-Button {
  text-align: center;
  margin-top: -15px;
}

.register-button-style {
  width: 100px; /* Largura ajustada */
  height: 30px; /* Altura ajustada */
  font-size: 14px; /* Tamanho da fonte ajustado */
}

.box_style {
  border: 2px solid rgb(235, 235, 235);
  width: auto;
  border-radius: 5px;
}

.DropDown-style {
  width: 430px;
}

.FloatLabel label {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
  transform-origin: 0 0;
  color: #333; /* Cor do rótulo */
}

.FloatLabel input:focus + label,
.FloatLabel input:not(:placeholder-shown) + label {
  transform: translateY(-100%) scale(0.8);
}

.error-container {
  height: 24px; /* Ajuste conforme necessário */
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message {
  color: red;
}

.placeholder-error-message {
  visibility: hidden;
}
</style>
