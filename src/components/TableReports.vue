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
                    <div class="table-column">Laboratório</div>
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

<script setup>
import { RegistroStore } from '../stores/index';
import { onMounted, ref, computed } from 'vue';
import { format } from 'date-fns';
import Button from 'primevue/button';
import { provide } from 'vue';


const registroRedzone = RegistroStore();

const data = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(6);

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
  provide('formattedData', formattedData);
});

const formattedData = computed(() => {
  return data.value.map(item => ({
    ...item,
    formattedDate: format(new Date(item.dateTime), 'dd/MM/yyyy'),
    formattedTime: format(new Date(item.dateTime).setHours(new Date(item.dateTime).getHours() + 3), 'HH:mm')
  }));
});

const totalPages = computed(() => Math.ceil(formattedData.value.length / itemsPerPage));

const displayedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return formattedData.value.slice(startIndex, endIndex);
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


<style>

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