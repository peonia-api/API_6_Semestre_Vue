<template>
    <div class="area-container">
        <div class="area-box" v-for="(area) in displayedAreas" :key="area.id">
            <div class="area-info">
                <!-- Alteração aqui: passando o objeto 'area' inteiro ao invés de 'area.id' -->
                <div class="area-title" @click="navigateToRedZones(area)">{{ area.name }}</div>
                <div class="area-redzones">
                    <div v-for="redZone in area.redZones" :key="redZone.id">{{ redZone.name }}</div>
                </div>
                <div class="area-responsible">{{ area.user.name }}</div>
            </div>
            <div class="area-actions">
                <span class="pi pi-times delete-icon" @click="deleteArea(area.id)"></span>
                <span class="edit-icon"><img src="../assets/icons/iconEdit.png"
                        @click="router.push(`/editArea/${area.id}`)" /></span>
            </div>
            <div class="area-actions">
                <span class="pi pi-times delete-icon" @click="deleteArea(area.id)"></span>
                <span class="edit-icon"><img src="../assets/icons/iconEdit.png"
                        @click="router.push(`/editArea/${area.id}`)" /></span>
            </div>
        </div>
    </div>

    <div class="pagination">
        <button class="button-pagination" @click="prevPage" :disabled="currentPage === 1">
            <p>ANTERIOR</p>
        </button>
        <p class="page-number">{{ currentPage }}</p>
        <button class="button-pagination" @click="nextPage" :disabled="currentPage === totalPages">
            <p>PRÓXIMO</p>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import AreaStore from '../stores/Area';
import type { Area } from "../interfaces/Area";
import 'primeicons/primeicons.css'
import { useRouter } from 'vue-router';
import { avisoDeletarArea } from '../plugins/sweetalert';

const router = useRouter();

const currentPage = ref(1);
const itemsPerPage = 6;

const registroArea = AreaStore();
const areasDados = ref<Area[]>([]);

const navigateToRedZones = (area: Area) => {
    registroArea.setSelectedAreaRedzones(area.redZones);
    router.push({ name: 'RedzoneListing', params: { areaId: area.id } });
};

const fetchAreas = async () => {
    try {
        await registroArea.getAllareas();
        areasDados.value = registroArea.areas;
    } catch (error) {
        console.error('Erro ao buscar Areas:', error);
    }
};

onMounted(() => {
    fetchAreas();
});

const displayedAreas = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return areasDados.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(areasDados.value.length / itemsPerPage));
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

const deleteArea = async (areaId: string) => {
    const result = await avisoDeletarArea();
    if (result.isConfirmed) {
        try {
            console.log(areaId);
            await registroArea.deleteArea(areaId);
            fetchAreas();
        } catch (error) {
            console.error('Erro ao excluir área:', error);
        }
    }
}

</script>


<style>
.table {
    background-color: #ffffff;
    border-radius: 8px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
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

.area-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
}

.area-box {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 30%;
    margin: 10px;
    padding: 20px;
    position: relative;
}

.area-info {
    margin-bottom: 20px;
}

.area-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.area-redzones {
    font-size: 16px;
    color: #666;
}

.area-responsible {
    font-size: 16px;
    color: #666;
}

.area-actions {
    position: absolute;
    right: 10px;
    top: 30px;
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
</style>