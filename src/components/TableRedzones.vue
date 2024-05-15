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
        <div class="table-row" v-for="(item, index) in tableData" :key="index">
          <div class="table-column">{{ item.redZone }}</div>
          <div class="table-column">{{ item.area }}</div>
          <div class="table-column">{{ item.responsavel }}</div>
          <div class="table-column">{{ item.capMaxima }}</div>
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
  import { ref} from 'vue';
  import 'primeicons/primeicons.css'

  const currentPage = ref(1);
 

  
  const tableData = ref([
    { redZone: 'Zone 1', area: '1', responsavel: 'Ana Neves', capMaxima: 50 },
    { redZone: 'Zone 2', area: '2', responsavel: 'Diego Silva', capMaxima: 30 },
    { redZone: 'Zone 3', area: '3', responsavel: 'Jennyfer Ramos', capMaxima: 40 },
    { redZone: 'Zone 4', area: '4', responsavel: 'Matheus Silva', capMaxima: 20 },
    { redZone: 'Zone 5', area: '5', responsavel: 'Wallace Marinho', capMaxima: 35 }
  ]);
  

  const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
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
  