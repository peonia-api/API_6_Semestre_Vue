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
          <div v-for="(item, index) in registroRedzone.dados" :key="index" class="table-row" >
            <div class="table-column">{{ item.occurrence }}</div>
            <div class="table-column">{{ item.dateTime }}</div>
            <div class="table-column">{{ item.dateTime }}</div>
            <div class="table-column">{{ item.room }}</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RegistroStore } from '../stores/index';
import { onMounted } from 'vue';

const registroRedzone = RegistroStore();

const pegarDados = async () => {
  try {
    await registroRedzone.historicRegister();
  } catch (error) {
    console.log('Erro ao obter dados:', error);
  }
}

onMounted(() => {
  pegarDados();
});
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
