import { defineStore } from "pinia";
import { ref } from "vue";
import type { Redzone } from "@/interfaces/CreateNewRedzone";
import { createRedzone, getRedzone } from "@/utils/services/axiosRedzone";

const RedzoneStore = defineStore('redzone', () => {
    const redzones = ref<Redzone[]>([]);

    const create = async (redzone: Redzone) => {
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

    return {
        redzones,
        create
    }

});

export default RedzoneStore;