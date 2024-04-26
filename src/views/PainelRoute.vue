<template>
    <div class="title-ocorrencias">
        <p>Painel de Ocorrências</p>
    </div>
    <div class="outer-container">
        <div>
            <Grafico></Grafico>
        </div>
        <div class="table">
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
                        <i :class="item.occurrence === '1' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"></i>
                    </div>
                    <div class="table-column">{{ item.formattedDate }}</div>
                    <div class="table-column">{{ item.formattedTime }}</div>
                    <div class="table-column">Laboratório</div>
                </div>
            </div>
        </div>
        <div class="pagination-painel">
            <div><Button class="button-pagination-painel"><p>ANTERIOR</p></Button></div>
            <div><Button class="button-pagination-painel"><p>PRÓXIMO</p></Button></div>
        </div>
    </div>
</template>

<script setup="ts">
import { RegistroStore } from '../stores/index';
import { onMounted, ref, computed } from 'vue';
import { format } from 'date-fns';
import Button from 'primevue/button';
import Grafico from '../components/Grafico.vue'

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
const itemsPerPage = 4;

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

const gotoPage = (pageNumber) => {
    currentPage.value = pageNumber;
}


</script>

<style>
.outer-container {
    background-color: #f3f3f3;
    border-radius: 15px;
    align-items: center;
    width: 75%;
    height: 60%;
    margin-bottom: 150px;   
}

.table {
    background-color: #ffffff;
    border-radius: 8px;
    width: 90%;
    height: 70%;
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

.title-ocorrencias {
    font-size: 27px;
    font-weight: bold;
    margin-bottom: 10px;    
}
.title-ocorrencias p{
    margin-bottom: 10px;
    border-bottom: 2px solid #ccc;
}

.export-icon {
    width: 30px;
    height: 35px;
}

.export-dropdown {
    margin-right: 60px;
}

.pagination-painel{
    display: flex;
     justify-content: space-between;
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
    background-color: #2b547e;
}
</style>