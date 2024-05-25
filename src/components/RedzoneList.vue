<template>
  <div class="collapsible-container">
    <details v-for="(redzone) in paginatedRedzones" :key="redzone.id">
        <summary v-if="redzone.user.id === idUser || funcao === 'ROLE_ADMIN' || redzone.area.user.email === emailUser" class="collapsible-title" @click="navigateToPainel(redzone)">{{ redzone.name }}</summary>
    </details>
  </div>
  <div class="pagination">
    <button class="button-pagination" @click="prevPage" :disabled="currentPage === 1">ANTERIOR</button>
    <p class="page-number">{{ currentPage }}</p>
    <button class="button-pagination" @click="nextPage" :disabled="currentPage === totalPages">PRÓXIMO</button>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import RedzoneStore from '../stores/Redzone';
import type { Redzone } from '../interfaces/CreateNewRedzone';

const idUser = JSON.parse(localStorage.getItem('currentUser') || '').id
const funcao = JSON.parse(localStorage.getItem('currentUser') || '').permissionType
const emailUser = JSON.parse(localStorage.getItem('currentUser') || '').email

const redzoneStore = RedzoneStore();
const router = useRouter();

const currentPage = ref(1);
const itemsPerPage = 6;

const redzonesDados = ref<Redzone[]>([]);

const totalPages = computed(() => Math.ceil(redzonesDados.value.length / itemsPerPage));

const paginatedRedzones = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return redzonesDados.value.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const fetchRedzones = async () => {
  try {
    await redzoneStore.getAllRedzones();
    redzonesDados.value = redzoneStore.redzones;
  } catch (error) {
    console.error('Erro ao buscar Redzones:', error);
  }
};

console.log(redzonesDados);


const navigateToPainel = (redzone: Redzone) => {
  router.push({ name: 'painelView', params: { redzoneName: redzone.name } }).then(() => {
        nextTick(() => {
            window.location.reload()
        });
      });
};

onMounted(() => {
  fetchRedzones();
});
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

.collapsible-container details {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 5px;
}

.collapsible-container summary {
  cursor: pointer;
  font-weight: bold;
  padding: 5px;
  user-select: none;
}

.collapsible-content {
  padding: 10px;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}

.collapsible-content > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.collapsible-content p {
  margin: 5px 0;
}
</style>