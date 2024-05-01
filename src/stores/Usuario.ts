import { defineStore } from "pinia";
import { getCurrentUser, getUser } from "../utils/services/axiosUser";
import type { Usuario } from "@/interfaces/User";
import { ref } from "vue";

const UsuarioStore = defineStore('usuario', () => {
    const users = ref<Usuario[]>([]);

    const fetchCurrentUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            users.value = [currentUser];
        } catch (error: unknown) {
            console.error('Erro ao buscar usuário atual:', error);
        }
    };

    const getAllUsers = async () => {
        try {
            const res = await getUser('');
            users.value = res.data.reverse();
        } catch (error: unknown) {
            console.error('Erro ao buscar usuários:', error);
        }
    }

    
  
    return {
        users,
        getAllUsers,
        fetchCurrentUser
    };
});

export default UsuarioStore;