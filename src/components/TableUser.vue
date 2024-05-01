<template>
  <div class="table-container">
    <div class="titulo-container">
      <div class="title">
        <p>Listagem de Usuários</p>
      </div>
      <div class="export-dropdown">
        <button @click="goToCadastro" class="button-add">ADICIONAR USUÁRIOS</button>
      </div>
    </div>
    <div class="table">
      <div class="table-header">
        <div class="table-row">
          <div class="table-column">Nome</div>
          <div class="table-column">Sobrenome</div>
          <div class="table-column">Usuário</div>
          <div class="table-column">Função</div>
        </div>
      </div>
      <div class="table-body" ref="tableBody">
        <div class="table-row" v-for="user in registroUser.users" :key="user.id">
          <div class="table-column">{{ user.name }}</div>
          <div class="table-column">{{ user.surname }}</div>
          <div class="table-column">{{ user.email }}</div>
          <div class="table-column">{{ user.function }}</div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button class="button-previous">ANTERIOR</button>
      <button class="button-next">PRÓXIMO</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import UsuarioStore from '../stores/Usuario';
import type { Usuario } from "../interfaces/User";
const registroUser = UsuarioStore();
const router = useRouter();

const usersDados: Ref<Usuario[]> = ref([]);

const goToCadastro = () => {
  router.push({ name: 'cadastroView' });
};

const fetchUsers = async () => {
  try {
    await registroUser.getAllUsers();
    console.log(registroUser.users);
    
    usersDados.value = registroUser.users; 
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
};

onMounted(() => {
  fetchUsers();
});

</script>


<style>
.table-container {
    background-color: #f3f3f3;
    border-radius: 15px;
    align-items: center;
    width: 75%;
    height: 60%;
}
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
    width: 90%;
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
</style>