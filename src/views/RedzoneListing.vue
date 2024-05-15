<template>
   <div class="title-ocorrencias">
    <p>Listagem de Redzones</p>
  </div>
  <div class="outer-container">
    <div class="export-dropdown">
      <button @click="goToCadastroR" class="button-add">ADICIONAR REDZONE</button>
    </div>

    <div class="table-container">
      <TableUser></TableUser>
    </div>

  </div>  
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToCadastroR = () => {
  router.push({ name: 'RedzoneRegistration' });
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

.title-ocorrencias {
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 10px;
}

.title-ocorrencias p {
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
}

.table-container {
  background-color: #f3f3f3;
  border-radius: 15px;
  align-items: center;
  width: 90%;
}

.export-dropdown{
  display: flex;
  align-self: flex-end;
  margin-right: 35px;
  margin-bottom: 20px;
}


</style>