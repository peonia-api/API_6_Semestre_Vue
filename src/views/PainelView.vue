<template>
  <div class="title-ocorrencias">
    <p>Ocorrências {{ redzoneName }}</p>
  </div>
  <div class="painel-container">
    <div class="current-count">
      <h3>Pessoas atuais na Redzone: {{ currentCount }}</h3>
    </div>
    <div v-if="alertMessage" class="alert-message">
      {{ alertMessage }}
    </div>
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
import { defineProps, ref, onMounted, computed, watch } from 'vue';
import Grafico from '../components/Grafico.vue';
import TableReports from '../components/TableReports.vue';
import useRegistroStore from '../stores/Registro';
import * as XLSX from 'xlsx';
import useRedzoneStore from '../stores/Redzone';

import Button from 'primevue/button';
const registro = useRegistroStore();
const redzoneStore = useRedzoneStore();

const props = defineProps<{ redzoneName: string }>();

const state = ref({inicialDate: "", endDate: ""});
console.log(props.redzoneName);

const registroRedzone = useRegistroStore();

const currentCount = computed(() => registroRedzone.currentCount);
const alertMessage = ref('');

const checkPersonLimit = (newCount: number) => {
  const redzone =  redzoneStore.redzones.find((rz) => rz.name === props.redzoneName);
  if (redzone) {
    console.log(`Redzone: ${redzone.name}, Limite: ${redzone.personLimit}, Contagem Atual: ${newCount}`);
    if (newCount > redzone.personLimit) {
      alertMessage.value = "Limite de pessoas ultrapassado";
    } else {
      alertMessage.value = '';
    }
  } else {
    console.log(`Redzone with name ${props.redzoneName} not found.`);
  }
};

onMounted(() => {
  redzoneStore.getAllRedzones(); // Garantir que estamos buscando todas as redzones
  registroRedzone.historicRegister();
  registroRedzone.connectWebSocket();

  watch(
    () => registroRedzone.currentCount,
    (newCount) => {
      checkPersonLimit(newCount);
    }
  );

  watch(
    () => redzoneStore.redzones,
    () => {
      checkPersonLimit(currentCount.value); // Re-check limit when redzones are updated
    }
  );
});

const exportToExcel = () => {
  const formattedData = JSON.parse(localStorage.getItem('formattedData') || '');

  if (formattedData) {
    const worksheet = XLSX.utils.json_to_sheet(formattedData.map((item: { occurrence: string; formattedDate: any; formattedTime: any; room: string }): any => ({
      'Ocorrência': item.occurrence === '0' ? 'saída' : 'entrada',
      'Data': item.formattedDate,
      'Hora': item.formattedTime,
      'Sala': item.room
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

<style>
.chart-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.chart-container canvas {
  width: 500px;
  height: 400px;
}

.current-count {
  padding: 10px;
  background-color: #e1e1e1;
  border-radius: 5px;
  margin-bottom: 20px;
}

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

.export-dropdown {
  margin-bottom: 20px;
}

.alert-message {
  padding: 10px;
  background-color: red;
  color: white;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
