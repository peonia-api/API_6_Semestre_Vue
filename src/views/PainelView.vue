<template>
  <div class="title-ocorrencias">
    <p>Ocorrências {{ redzoneName }}</p>
  </div>
  <div class="painel-container">
    <div class="current-count">
      <h3>Pessoas Atuais na Redzone: {{ currentCount }}</h3>
    </div>
    <div class="export-dropdown">
      <img src="@/assets/icons/Export_Icon.png" alt="Exportar Tabela para Excel" @click="exportToExcel" class="export-icon">
    </div>
    <div>
      <Grafico></Grafico>
    </div>
    <div class="table-container">
      <TableReports :items-per-page="4" :redzoneName="redzoneName"></TableReports>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, computed } from 'vue';
import Grafico from '../components/Grafico.vue';
import TableReports from '../components/TableReports.vue';
import useRegistroStore from '@/stores/Registro';
import * as XLSX from 'xlsx';

const props = defineProps<{ redzoneName: string }>();
const registroRedzone = useRegistroStore();

onMounted(() => {
  registroRedzone.historicRegister();
  registroRedzone.connectWebSocket();
});

const currentCount = computed(() => registroRedzone.currentCount);

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
</script>

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
</style>
