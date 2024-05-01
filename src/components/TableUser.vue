<template>
  <div class="table-container">
    <div class="export-dropdown">
      <button @click="goToCadastro" class="button-add">ADICIONAR USUÁRIOS</button>
    </div>
    <div class="table">
      <div class="table-header">
        <div class="table-row">
          <div class="table-column">Nome</div>
          <div class="table-column">Sobrenome</div>
          <div class="table-column">Usuário</div>
          <div class="table-column">Função</div>
          <div class="table-column">Ações</div>
        </div>
      </div>
      <div class="table-body" ref="tableBody">
        <div class="table-row" v-for="user in registroUser.users" :key="user.id">
          <div class="table-column">{{ user.name }}</div>
          <div class="table-column">{{ user.surname }}</div>
          <div class="table-column">{{ user.email }}</div>
          <div class="table-column">{{ user.function }}</div>
          <div class="table-column">
            <span class="pi pi-times delete-icon"></span>

            <span class="edit-icon"> <img src='../assets/icons/iconEdit.png' /></span>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <div>
        <Button class="button-pagination" @click="prevPage">
          <p>ANTERIOR</p>
        </Button>
      </div>
      <div>
        <p class="page-number">{{ currentPage }}</p>
      </div>
      <div>
        <Button class="button-pagination" @click="nextPage">
          <p>PRÓXIMO</p>
        </Button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import UsuarioStore from '../stores/Usuario';
import type { Usuario } from "../interfaces/User";

import 'primeicons/primeicons.css'

const registroUser = UsuarioStore();
const router = useRouter();
const usersDados = ref<Usuario[]>([]);
const currentPage = ref(1);
const itemsPerPage = 6;

const goToCadastro = () => {
  router.push({ name: 'cadastroView' });
};

const fetchUsers = async () => {
  try {
    await registroUser.getAllUsers();
    usersDados.value = registroUser.users;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
};

onMounted(() => {
  fetchUsers();
});

const totalPages = computed(() => Math.ceil(usersDados.value.length / itemsPerPage));

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
.table-container {
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

.export-dropdown{
  display: flex;
  align-self: flex-end;
  margin-right: 35px;
  margin-bottom: 20px;
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
.button-previous {
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


.edit-icon {
  cursor: pointer;
}

.edit-icon img {
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease;
}

.edit-icon img:hover {
  transform: scale(1.1);
}

.delete-icon {
  cursor: pointer;
  margin-right: 10px;
  font-size: 2rem;
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