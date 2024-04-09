import { defineStore } from "pinia";
import { getRequest } from "../utils/services/axios";
import { ref } from "vue";
import type { Register } from "../interfaces/RegisterRedzone";

const RegistroStore = defineStore('redzone', () => {
    const dados = ref<Register[]>([])

    const historicRegister = async () => {
        const response = await getRequest('all');
        dados.value = response.data.reverse();
    }
    return {
        dados,
        historicRegister
    }
})

export default RegistroStore;
