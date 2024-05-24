import { defineStore } from "pinia";
import { createArea, getArea, getAreabyId, putAreabyId, deletaArea } from "../utils/services/axiosArea";
import type { Area, RedZone } from "@/interfaces/Area";
import { ref } from "vue";

const AreaStore = defineStore('area', () => {
    const areas = ref<Area[]>([]);
    const selectedAreaRedzones = ref<RedZone[]>([]);

    const setSelectedAreaRedzones = (redzones: RedZone[]) => {
        selectedAreaRedzones.value = redzones;
    };

    const getSelectedAreaRedzones = () => selectedAreaRedzones.value;

    const getAllareas = async () => {
        try {
            const res = await getArea('');
            areas.value = res.data.reverse();
        } catch (error: unknown) {
            console.error('Erro ao buscar área:', error);
        }
    }

    const create = async (area: Area) => {
        try {
            const res = await createArea(area);
            areas.value.unshift(res.data);
            await getAllareas();
        } catch (error) {
            console.error('Erro ao criar área:', error);
            throw error;
        }
    }

    const deleteArea = async (areaId: string) => {
        try {
            await deletaArea(areaId);
            await getAllareas();
        } catch (error) {
            console.error('Erro ao deletar área:', error);
            throw error;
        }
    };
      
    const findByIdArea = async (areaId: string) => {
        try {
            const res = await getAreabyId(areaId);
            return res;   
        } catch (error) {
            console.error('Erro ao buscar área por ID:', error);
            throw error;
        }
    };

    const putArea = async (areaId: string, areaData: Area) => {
        try {
            const res = await putAreabyId(areaId, areaData); 
            return res.data; 
        } catch (error) {
            console.error('Erro ao atualizar área por ID:', error);
            throw error;
        }
    };
    return {
        areas,
        selectedAreaRedzones,
        setSelectedAreaRedzones,
        getSelectedAreaRedzones,
        getAllareas,
        deleteArea,
        findByIdArea,
        putArea,
        create
    };
});

export default AreaStore;