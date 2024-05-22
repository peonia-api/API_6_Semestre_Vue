<template>
  <div class="table">
    <div class="table-header">
      <div class="table-row">
        <div class="table-column">Red Zone</div>
        <div class="table-column">Área</div>
        <div class="table-column">Responsável</div>
        <div class="table-column">Cap. Máxima</div>
        <div class="table-column">Opções</div>
      </div>
    </div> 
    <div class="table-body">
      <div class="table-row" v-for="(redzone) in displayedRedzones" :key="redzone.id">
        <div class="table-column">{{ redzone.name }}</div>
        <div class="table-column">{{ redzone.cameraSpot }}</div>
        <div class="table-column">{{ redzone.description }}</div>
        <div class="table-column">{{ redzone.personLimit }}</div>
        <div class="table-column">
          <span class="pi pi-times delete-icon"></span>
          <span  class="edit-icon" > <img src="../assets/icons/iconEdit.png"/> </span>
        </div>
      </div>
    </div>
  </div>


<div class="pagination">
  <div>
    <button class="button-pagination" @click="prevPage" :disabled="currentPage === 1">
      <p>ANTERIOR</p>
    </button>
  </div>
  <div>
    <p class="page-number">{{ currentPage }}</p>
  </div>
  <div>
    <button class="button-pagination" @click="nextPage" :disabled="currentPage === totalPages">
      <p>PRÓXIMO</p>
    </button>
  </div>
</div>  
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import 'primeicons/primeicons.css';
import type { Redzone } from '@/interfaces/CreateNewRedzone';
import RedzoneStore from '../stores/Redzone';



const currentPage = ref(1);
const redzoneDados = ref<Redzone[]>([]);
const itemsPerPage = 6;
const registroRedzone = RedzoneStore();


const fetchRedzones = async () => {
  try {
    await registroRedzone.getAllRedzones();
    redzoneDados.value = registroRedzone.redzones;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
};

onMounted(() => {
  fetchRedzones();
});

const totalPages = computed(() => Math.ceil(redzoneDados.value.length / itemsPerPage));

const displayedRedzones = computed(() => {
const startIndex = (currentPage.value - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
return redzoneDados.value.slice(startIndex, endIndex);
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
</style>