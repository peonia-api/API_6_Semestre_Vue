<template>
  <div class="table">
    <div class="table-header">
      <div class="table-row">
        <div class="table-column">Ocorrência</div>
        <div class="table-column">Data</div>
        <div class="table-column">Horário</div>
        <div class="table-column">Sala</div>
      </div>
    </div>
    <div v-for="(item, index) in displayedData" :key="index" class="table-row">
      <div class="table-column">
        <i :class="item.occurrence === '1' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"></i>
      </div>
      <div class="table-column">{{ item.formattedDate }}</div>
      <div class="table-column">{{ item.formattedTime }}</div>
      <div class="table-column">{{ item.room }}</div>
    </div>
  </div>

  <div class="pagination-painel">
    <div>
      <Button class="button-pagination-painel" @click="prevPage"><p>ANTERIOR</p></Button>
    </div>
    <div><p class="page-number">{{ currentPage }}</p></div>
    <div>
      <Button class="button-pagination-painel" @click="nextPage"><p>PRÓXIMO</p></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { format } from 'date-fns';
import Button from 'primevue/button';
import useRegistroStore from '../stores/Registro';  // Certifique-se de que o caminho está correto
import type { Register } from "../interfaces/RegisterRedzone";

const registroRedzone = useRegistroStore();
const data = ref<Register[]>([]);
const currentPage = ref(1);

interface Props {
  itemsPerPage: number;
  redzoneName: string;
}

const props = defineProps<Props>();

const formattedData = computed(() => {
  return data.value.map(item => ({
    ...item,
    formattedDate: format(new Date(item.dateTime), 'dd/MM/yyyy'),
    formattedTime: format(new Date(item.dateTime).setHours(new Date(item.dateTime).getHours() + 3), 'HH:mm')
  }));
});

const totalPages = computed(() => Math.ceil(formattedData.value.length / props.itemsPerPage));

const displayedData = computed(() => {
  const startIndex = (currentPage.value - 1) * props.itemsPerPage;
  const endIndex = startIndex + props.itemsPerPage;
  return formattedData.value.slice(startIndex, endIndex);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

watch(formattedData, (newFormattedData) => {
  if (newFormattedData.length > 0) {
    localStorage.setItem('formattedData', JSON.stringify(newFormattedData));
  }
});

const pegarDados = async () => {
  try {
    await registroRedzone.historicRegister();
    if (registroRedzone.dados.value) {
      data.value = registroRedzone.dados.value.filter(item => item.room === props.redzoneName);
    }
  } catch (error) {
    console.log('Erro ao obter dados:', error);
  }
};

onMounted(() => {
  pegarDados();
  registroRedzone.connectWebSocket();
});

watch(
  () => registroRedzone.dados,
  (newDados) => {
    if (newDados) {
      data.value = newDados.filter(item => item.room === props.redzoneName);
    }
  },
  { deep: true }
);
</script>

<style scoped>
/* Seus estilos aqui */
.titulo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}
.table {
    background-color: #ffffff;
    border-radius: 8px;
    height: 70%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
.pagination{
    padding-top: 15px;
}   
.button-add {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    border-width: 1px;
    background-color: #003365;
    font-weight: bold;
    color: #fafafa;
}
.button-next,
.button-previous{
    width: 120px;
    height: 35px;
    border-radius: 8px;
    border-width: 1px;
    font-weight: bold;
    color: #fafafa; 
    transition: background-color 0.2s;
}
.button-add:hover,
.button-next:hover,
.button-previous:hover {
    background-color: #2b547e;
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

.pi.pi-arrow-right,
.pi.pi-arrow-left {
  font-size: 1.0rem; 
  margin: 0 5px; 
  border: 2px solid; 
  border-radius: 10px; 
  padding: 5px; 
}

.pi.pi-arrow-right {
  color: green; 
  border-color: green; 
}

.pi.pi-arrow-left {
  color: red; 
  border-color: red; 
}
.pagination-painel{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
}   
.button-pagination-painel {
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

.button-pagination-painel p {
    margin: 0; 
    font-size: 12px; 
}

.button-pagination-painel:hover {
    background-color: #588ec4;
}
</style>
