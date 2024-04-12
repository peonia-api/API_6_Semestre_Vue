<template>
  <div class="outer-container">
    <div class="titulo-container">
      <div class="title">
        <p>Relatório de ocorrências</p>
      </div>
      <div class="export-dropdown">
        <img src="@/assets/icons/Export_Icon.png" alt="Exportar Tabela para PDF" @click="exportTable" class="export-icon">
      </div>
    </div>
    <div class="table-container">
      <div class="table-header">
        <div class="table-row">
          <div class="table-column">Ocorrência</div>
          <div class="table-column">Data</div>
          <div class="table-column">Horário</div>
          <div class="table-column">Sala</div>
        </div>
      </div>
      <div class="table-body" ref="tableBody">
        <div v-for="(item, index) in displayedData" :key="index" class="table-row">
          <div class="table-column">
            <i :class="item.occurrence === 'ENTRANDO' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"></i>
          </div>
          <div class="table-column">{{ item.formattedDate }}</div>
          <div class="table-column">{{ item.formattedTime }}</div>
          <div class="table-column">Laboratório</div>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <div class="page-numbers">
          <button v-for="pageNumber in totalPages" :key="pageNumber" @click="gotoPage(pageNumber)" :class="{ active: pageNumber === currentPage }">{{ pageNumber }}</button>
        </div>
        <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RegistroStore } from '../stores/index';
import { onMounted, ref, computed } from 'vue';
import { format } from 'date-fns';
const registroRedzone = RegistroStore();

const pegarDados = async () => {
  try {
    await registroRedzone.historicRegister();
    data.value = registroRedzone.dados;
  } catch (error) {
    console.log('Erro ao obter dados:', error);
  }
}

onMounted(() => {
  pegarDados();
});

const data = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6;

const formattedData = computed(() => {
  return data.value.map(item => ({
    ...item,
    formattedDate: format(new Date(item.dateTime), 'dd/MM/yyyy'),
    formattedTime: format(new Date(item.dateTime), 'HH:mm')
  }));
});

const totalPages = computed(() => Math.ceil(formattedData.value.length / itemsPerPage));

const displayedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return formattedData.value.slice(startIndex, endIndex);
});

const formatDate = (dateTime) => {
  return format(new Date(dateTime), 'dd/MM/yyyy');
}

const formatTime = (dateTime) => {
  const adiantarHorario = new Date(new Date(dateTime).getTime() + (3 * 60 * 60 * 1000));
  return format(adiantarHorario, 'HH:mm');
}

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

const gotoPage = (pageNumber) => {
  currentPage.value = pageNumber;
}
</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  width: 80%; 
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color:#f1f1f1;
  padding: 10px;
}

.table-container {
  background-color:#fafafa;
  border-radius: 8px;
  width: 100%;
  min-height: 230px; 
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

.table-body .table-row:not(:last-child) {
  border-bottom: 1px solid #ccc;
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

.titulo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.title {
  font-size: 24px;
  font-weight: bold; 
  margin-left: 40px;
}

.export-icon {
  width: 30px; 
  height: 35px;
}

.export-dropdown{
  margin-right: 60px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination button {
  margin: 0 5px;
}
</style>
