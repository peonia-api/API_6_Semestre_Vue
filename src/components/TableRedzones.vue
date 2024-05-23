<template>
  <div class="collapsible-container">
    <details v-for="(redzone, index) in displayedRedzones" :key="index">
      <summary class="collapsible-title">{{ redzone.name }}</summary>
      <div class="collapsible-content">
        <p>Área: {{ redzone.area.name }}</p>
        <p>Responsável: {{ redzone.responsibleGuard }}</p>
        <p>Cap. Máxima: {{ redzone.personLimit }}</p>
        <div>
          <span class="pi pi-times delete-icon" @click="deleteRedZone(redzone.id)"></span>
          <span class="edit-icon">
            <span  class="edit-icon" ><img @click="router.push(`/editRedzone/${redzone.id}`)" src="../assets/icons/iconEdit.png"/> </span>
          </span>
        </div>
      </div>
    </details>
  </div>

  <div class="pagination">
    <button class="button-pagination" @click="prevPage" :disabled="currentPage === 1">ANTERIOR</button>
    <p class="page-number">{{ currentPage }}</p>
    <button class="button-pagination" @click="nextPage" :disabled="currentPage === totalPages">PRÓXIMO</button>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import 'primeicons/primeicons.css';
import type { Redzone } from '../interfaces/CreateNewRedzone';
import RedzoneStore from '../stores/Redzone';
import { avisoDeletarRedZone } from '../plugins/sweetalert';
import type { Area, TransformedRedZone } from '../interfaces/Area';
import AreaStore from '../stores/Area';
import { useRouter } from 'vue-router';

const router = useRouter();

const currentPage = ref(1);
const redzoneDados = ref<Redzone[]>([]);
const areaDados = ref<Area[]>([]);
const redzoneDadosConverted = ref<TransformedRedZone[]>([]);
const itemsPerPage = 6;
const registroRedzone = RedzoneStore();
const registroAreas = AreaStore();


const fetchRedzones = async () => {
  try {
    await registroRedzone.getAllRedzones();
    redzoneDados.value = registroRedzone.redzones;
  } catch (error) {
    console.error('Erro ao buscar redzones:', error);
  }
};


const fetchAreas = async () => {
  try {
    await registroAreas.getAllareas();
    areaDados.value = registroAreas.areas;
  } catch (error) {
    console.error('Erro ao buscar areas:', error);
  }
};

onMounted(() => {
  fetchAreas();
});


const transformAreasToRedZones = (areas: Area[]): TransformedRedZone[] => {
    return areas.flatMap(area => 
        area.redZones.map(redZone => ({
            ...redZone,
            area: {
                id: area.id,
                name: area.name,
                description: area.description,
                responsibleManager: area.responsibleManager,
                user: area.user
            }
        }))
    );
};

watch(areaDados, (newValue) => {
  const newArea = transformAreasToRedZones (newValue) 
  redzoneDadosConverted.value = newArea
})

const totalPages = computed(() => Math.ceil(redzoneDados.value.length / itemsPerPage));

const displayedRedzones = computed(() => {
const startIndex = (currentPage.value - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
return redzoneDadosConverted.value.slice(startIndex, endIndex);
});  

const prevPage = () => {
if (currentPage.value > 1) {
  currentPage.value--;
}
}


const nextPage = () => {
if (currentPage.value < totalPages.value) {
  currentPage.value++;
}
}

const deleteRedZone = async (redzoneId: string) => {
  const result = await avisoDeletarRedZone();
  if (result.isConfirmed) {
    try {
      console.log(redzoneId);
      await registroRedzone.deletaRedZone(redzoneId);
      fetchRedzones(); 
    } catch (error) {
      console.error('Erro ao excluir redzone:', error);
    }
  }
}

</script>

<style scoped>
.table {
  background-color: #ffffff;
  border-radius: 8px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.table-header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.table-column {
  flex: 1;
  text-align: center;
  margin-right: 20px;
}

.table-body .table-row:nth-child(odd) {
  background-color: #f9f9f9;
}

.edit-icon {
cursor: pointer;
}

.edit-icon img {
width: 25px;
height: 25px;
transition: transform 0.3s ease;
}

.edit-icon img:hover {
transform: scale(1.1);
}

.delete-icon {
cursor: pointer;
margin-right: 10px;
font-size: 1.8rem;
color: red;
}

.delete-icon:hover {
color: darkred;
}

.pagination {
display: flex;
justify-content: center;
align-items: center;
padding-top: 10px;
}

.button-pagination {
width: 80px;
height: 25px;
background-color: #2b547e;
display: flex;
align-items: center;
justify-content: center;
margin: 0 10px;
border: none;
border-radius: 8px;
font-weight: bold;
color: #fafafa;
}

.button-pagination p {
margin: 0;
font-size: 12px;
}

.button-pagination:hover {
background-color: #588ec4;
}

.collapsible-container details {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 5px;
}

.collapsible-container summary {
  cursor: pointer;
  font-weight: bold;
  padding: 5px;
  user-select: none;
}

.collapsible-content {
  padding: 10px;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}

.collapsible-content > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.collapsible-content p {
  margin: 5px 0;
}
</style>