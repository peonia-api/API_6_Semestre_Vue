<template>
  <div class="title-ocorrencias">
    <p>Ocorrências {{ redzoneName }}</p>
  </div>
  <div class="painel-container">
    <div class="export-dropdown">
      <img src="@/assets/icons/Export_Icon.png" alt="Exportar Tabela para Excel" @click="exportToExcel" class="export-icon">
    </div>
    <div class="filter-and-chart-container">
      <div class="filter-container">
        <p class="filter-title">Filtro</p>
        <div class="date-filters">
          <div class="date-filter">
            <label>De</label>
            <input type="date" v-model="state.inicialDate">
          </div>
          <div class="date-filter">
            <label>Até</label>
            <input type="date" v-model="state.endDate">
          </div>
        </div>
        <div class="submit-filter">
          <Button label="Buscar" @click="getFilteredRegister" class="submit-button"/>
        </div>
      </div>
      <div class="chart-container">
        <Grafico></Grafico>
      </div>
    </div>
    <div class="table-container">
      <TableReports :items-per-page="4" :redzoneName="redzoneName"></TableReports>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Grafico from '../components/Grafico.vue';
import TableReports from '../components/TableReports.vue';
import * as XLSX from 'xlsx';

import Button from 'primevue/button';
import useRegistroStore from '../stores/Registro';
const registro = useRegistroStore();

const props = defineProps<{ redzoneName: string }>();

const state = ref({inicialDate: "", endDate: ""});
console.log(props.redzoneName);

const exportToExcel = () => {
  const formattedData = JSON.parse(localStorage.getItem('formattedData') || '');

  if (formattedData) {
    const worksheet = XLSX.utils.json_to_sheet(formattedData.map((item: { occurrence: string; formattedDate: any; formattedTime: any; }): any => ({
      'Ocorrência': item.occurrence === '0' ? 'saída' : 'entrada',
      'Data': item.formattedDate,
      'Hora': item.formattedTime,
      'Sala': 'Laboratório'
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ocorrências');
    XLSX.writeFile(workbook, 'relatorio_ocorrencias.xlsx');
  } else {
    console.log('Não há dados formatados no localStorage.');
  }
};

const getFilteredRegister = () => {
  registro.getRegisterByPeriod(state.value.inicialDate, state.value.endDate);
};
</script>

<style>
.painel-container {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  background-color: #f3f3f3;
  border-radius: 15px;
  width: 75%;
  margin-bottom: 150px;
  position: relative;
}

.filter-and-chart-container {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.table-container {
  background-color: #f3f3f3;
  border-radius: 15px;
  align-items: center;
  width: 90%;
}

.title-ocorrencias {
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 10px;
}

.title-ocorrencias p {
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
}

.filter-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
}

.filter-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 80px;
}

.date-filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.date-filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 10px;
}

.date-filter label {
  margin-bottom: 5px;
}

.submit-filter {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.submit-button {
  background-color: black;
  color: white;
  padding: 5px 10px; 
  font-size: 14px; 
  margin-left: 80px; 
}

.chart-container {
  flex-grow: 1;
}
</style>
