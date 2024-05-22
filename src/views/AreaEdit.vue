<template>
  <div class="title-ocorrencias">
      <p>Editar Área</p>
  </div>
  <UserBox background_color="blue_color">
      <div class="Input-Texts">
          <div class="input-container">
              <InputText type="text" v-model="areaData.name" placeholder="Nome" />
          </div>
          <div class="input-container">
              <InputText type="text" v-model="areaData.description" placeholder="Descrição" />
          </div>
          <div class="input-container">
            <MultiSelect 
          v-model="selectedRedZones" 
          :options="areaData.redZones" 
          optionLabel="name" 
          placeholder="Redzones Selecionadas" 
          class="w-full md:w-20rem" 
          :show="showAllRedZones"
        />
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
import MultiSelect from 'primevue/multiselect';
import UserBox from '@/components/UserBox.vue';
import AreaStore from '../stores/Area';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { avisoEditar, avisoVoltar } from '../plugins/sweetalert';

const router = useRouter();
const { findByIdArea, putArea } = AreaStore();
const route = useRoute();

const areaId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const areaData = ref({
name: '',
description: '',
responsibleManager: 'Gerente Responsável',
user: {
  id: ''
},
redZones: []
});

const selectedRedZones = ref([]);

async function getArea() {
try {
  const response = await findByIdArea(areaId);
  areaData.value = { ...response };
  selectedRedZones.value = [...areaData.value.redZones];
} catch (error) {
  console.log('Erro ao buscar informações do usuário:', error);
}
}

onMounted(async () => {
await getArea();
});

async function submitPutForm() {
const result = await avisoEditar();
if (result.isConfirmed) {
  try {
    const updatedRedZones = selectedRedZones.value.map(selectedZone => {
      return areaData.value.redZones.find(zone => zone.id === selectedZone.id);
    });
    areaData.value.redZones = updatedRedZones;
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