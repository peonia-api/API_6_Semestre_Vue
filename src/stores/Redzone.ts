import { defineStore } from "pinia";
import { ref } from "vue";
import type { Redzone } from "@/interfaces/CreateNewRedzone";
import { createRedzone, deleteRedZone, getCurrentRedzone, getRedzone, getRedzonebyId, putRedzonebyId } from "@/utils/services/axiosRedzone";

const RedzoneStore = defineStore('redzone', () => {
    const redzones = ref<Redzone[]>([]);
  
        const fetchCurrentRedzone = async () => {
            try {
                const currentRedzone = await getCurrentRedzone();
                redzones.value = [currentRedzone];
            } catch (error: unknown) {
                console.error('Erro ao buscar redzone atual:', error);
            }
        };

        const findByIdRedzone = async (redzoneId: string) => {
            try {
                const res = await getRedzonebyId(redzoneId);
                return res;   
            } catch (error) {
                console.error('Erro ao buscar redzone por ID:', error);
                throw error;
            }
        };

    const create = async (redzone: Redzone | any) => {
        try {
            const res = await createRedzone(redzone);
            redzones.value.unshift(res.data);
            await getAllRedzones();
        } catch (error) {
            console.error('Erro ao criar redzones:', error);
            throw error;
        }
    }

    const getAllRedzones = async () => {
        try {
            const res = await getRedzone('');
            redzones.value = res.data.reverse();
        } catch (error: unknown) {
            console.error('Erro ao buscar redzones', error);
        }
    }

    const deletaRedZone= async (redzoneId: string) => {
        try {
            await deleteRedZone(redzoneId);
            await getAllRedzones();
        } catch (error) {
            console.error('Erro ao deletar redzone:', error);
            throw error;
        }
    };
    const putRedzone = async (redzoneId: string, redzoneData: Redzone) => {
        try {
            const res = await putRedzonebyId(redzoneId, redzoneData); 
            return res.data; 
        } catch (error) {
            console.error('Erro ao atualizar redzone por ID:', error);
            throw error;
        }
    };
    return {
        redzones,
        create,
        fetchCurrentRedzone,
        findByIdRedzone,
        getAllRedzones,
        deletaRedZone,
        putRedzone
    };

});

export default RedzoneStore;