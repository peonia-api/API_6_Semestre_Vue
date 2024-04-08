import { defineStore } from "pinia";
import { getRequest } from "../utils/services/axios";
import { ref } from "vue";
import type { RegistroRedzone } from "../interfaces/RegisterRedzone";

const RegistroStore = defineStore('redzone', () => {
    const dadosRedzone = ref<RegistroRedzone[]>([])
    const pegarHistoricoRedZone = async () => {
        const response = await getRequest('all');
        console.log(response.data);
        return response.data; 
    }
    return {
        dadosRedzone,
        pegarHistoricoRedZone
    }
})

export default RegistroStore;
