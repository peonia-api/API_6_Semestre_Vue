<template>
  <div class="title-ocorrencias">
    <p>Relatório de ocorrências</p>
  </div>
  <div class="outer-container">
    <div class="export-dropdown">
      <img src="@/assets/icons/Export_Icon.png" alt="Exportar Tabela para Excel" @click="exportToExcel" class="export-icon">
    </div>

    <div class="table-container">
      <TableReports :items-per-page="6"></TableReports>
    </div>
  </div>
</template>

<script setup="ts">

import TableReports from '../components/TableReports.vue'



const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(formattedData.value.map(item => ({
    'Ocorrência': item.occurrence,
    'Hora': item.formattedDate,
    'Data': item.formattedTime,
    'Sala': 'Laboratório'
  })))

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ocorrências');
  XLSX.writeFile(workbook, 'relatorio_ocorrencias.xlsx');
}

</script>


<style>
.outer-container {
    display: flex;
    flex-direction: column; 
    justify-content: center;
    padding-top: 15px;
    background-color: #f3f3f3;
    border-radius: 15px;
    align-items: center;
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

.export-icon {
  width: 30px; 
  height: 35px;
  transition: opacity 0.3s ease; 
}

.export-icon:hover {
  opacity: 0.7;
}
.export-dropdown{
  display: flex;
  align-self: flex-end;
  margin-right: 35px;
  margin-bottom: 20px;
}
</style>
