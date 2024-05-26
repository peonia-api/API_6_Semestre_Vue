<template>
    <div class="title-areas">
        <p>Listagem de Área</p>
    </div>
    <div class="outer-container">
        <div class="export-dropdown">
            <button @click="goToCadastro" class="button-add">ADICIONAR ÁREA</button>
        </div>

        <div class="table-container">
            <TableArea></TableArea>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import TableArea from '../components/TableArea.vue'
const router = useRouter();

const goToCadastro = () => {
  router.push({ name: 'cadastroAreaView' });
};

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

.title-areas {
    font-size: 27px;
    font-weight: bold;
    margin-bottom: 10px;
}

.title-areas p {
    margin-bottom: 10px;
    border-bottom: 2px solid #ccc;
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

.button-add:hover {
    background-color: #2b547e;
}

.export-dropdown {
    display: flex;
    align-self: flex-end;
    margin-right: 35px;
    margin-bottom: 20px;
}
</style>