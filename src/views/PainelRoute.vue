<template>
    <div class="title-ocorrencias">
        <p>Painel de Ocorrências</p>
    </div>
    <div class="painel-container">
        <div>
            <Grafico></Grafico>
        </div>

        <div class="table-container">
            <TableReports :items-per-page="4"></TableReports>
        </div>
    </div>
</template>

<script setup="ts">
import Grafico from '../components/Grafico.vue'
import TableReports from '../components/TableReports.vue'
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