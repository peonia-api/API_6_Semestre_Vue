<template>
  <div class="title-redzones">
    <p>Edição de Redzones</p>
  </div>
  <UserBox background_color="white_color" class="box_style">
    <div class="Input-Texts">
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
        <select class="input-field-select" v-model="selectedArea" id="id-area">
          <option value="" disabled>Selecione uma Área</option>
          <option v-for="area in areasDados" :key="area.id" :value="area">{{ area.name }}</option>
        </select>
      </FloatLabel>
      
      <FloatLabel class="field">
        <select class="input-field-select" v-model="redzoneData.user.name" id="id-guard">
          <option value="" disabled>Selecione um Guarda</option>
          <option v-for="guard in filteredGuards" :key="guard.id" :value="guard.name">{{ guard.name }}</option>
        </select>
      </FloatLabel>

      <FloatLabel class="field">
        <InputNumber class="input-field" style="margin-top: 10px" id="capmaximaredzone" v-model="redzoneData.personLimit" />
        <label for="capmaximaredzone">Capacidade Máxima</label>
      </FloatLabel>

      <div class="Register-Button">
          <Button label="Voltar" class="button-edit" severity="contrast" @click="submitVoltar"></Button>
          <Button label="Editar" class="button-edit" severity="contrast" @click="submitPutForm"></Button>
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

import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, type Ref } from 'vue';

import RedzoneStore from '../stores/Redzone';
import UsuarioStore from '../stores/Usuario';
import type { Usuario } from '../interfaces/User';
import AreaStore from '../stores/Area';
import type { Area } from '../interfaces/Area';
import { avisoEditar, avisoVoltar } from '../plugins/sweetalert';

const route = useRoute();
const router = useRouter();
const { findByIdRedzone, putRedzone } = RedzoneStore();
const registroUser = UsuarioStore();
const registroArea = AreaStore();

const areasDados = ref<Area[]>([]);
const usersDados = ref<Usuario[]>([]);
const filteredGuards: Ref<Usuario[]> = ref([]);


const redzoneId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const redzoneData: any= ref({
  id: '',
  name: '',
  description: '',
  cameraSpot: '',
  personLimit: 0,
  responsibleGuard: 'Gerente Responsavel',
  user: {
    id: '',
    name: '',
    surname: '',
    email: '',
    function: '',
    permissionType: ''
  },
  area: { id: '' }
});

const selectedArea = ref<Area | null>(null);

const fetchRedzone = async () => {
  try {
    const redzone = await findByIdRedzone(redzoneId);
    redzoneData.value = redzone;

    const area = areasDados.value.find(area => 
      area.redZones.some(rz => rz.id === redzone.id)
    );
    selectedArea.value = area || null;
  } catch (error) {
    console.error('Erro ao buscar Redzone:', error);
  }
};

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
    console.error('Erro ao buscar Areas:', error);
  }
};

async function submitPutForm() {
  redzoneData.value.responsibleGuard = selectedArea.value?.user.email
  const result = await avisoEditar();
  if (result.isConfirmed) {
    try {
      const updatedRedzoneData = {
        ...redzoneData.value,
        area: { id: selectedArea.value?.id || '' },
        user: usersDados.value.find(user => user.name === redzoneData.value.user.name) || {}
      };
      console.log(redzoneData);
      
      await putRedzone(redzoneId, updatedRedzoneData);
      router.push("/redzoneList");
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


onMounted(async () => {
  await fetchAreas();
  await fetchUsers();
  await fetchRedzone();
});
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
.button-edit{
  margin: 25px;
}

.input-field-select {
  width: 430px;
  height: 38px;
  border: 1px solid rgb(185, 185, 185);
  border-radius: 5px;
  font-size: 16px;
  padding: 8px;
  color: #414040;
}
.Register-Button {
  text-align: center;
  margin-top: -40px;
}

.box_style {
    border: 2px solid rgb(235, 235, 235);
    width: auto;
    border-radius: 5px;
    margin-bottom: 50px;
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

</style>