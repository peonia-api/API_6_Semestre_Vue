<template>
    <div class="title-ocorrencias">
        <p>Painel de Ocorrências</p>
    </div>
    <div class="painel-container">
        <div class="export-dropdown">
            <img src="@/assets/icons/Export_Icon.png" alt="Exportar Tabela para Excel" @click="exportToExcel" class="export-icon">
        </div>
        <div>
            <Grafico></Grafico>
        </div>
        <div class="table-container">
            <TableReports :items-per-page="4"></TableReports>
        </div>
    </div>
</template>

<script setup>
import Grafico from '../components/Grafico.vue'
import TableReports from '../components/TableReports.vue'
import * as XLSX from 'xlsx';

const exportToExcel = () => {
  const formattedData = JSON.parse(localStorage.getItem('formattedData'));

  if (formattedData) {
    const worksheet = XLSX.utils.json_to_sheet(formattedData.map(item => ({
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
}
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
</style>