import { defineStore } from "pinia";
import { createUser, getCurrentUser, getUser } from "../utils/services/axiosUser";
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

    const create = async (usuario: Usuario) => {
        try {
            const res = await createUser(usuario);
            users.value.unshift(res.data);
            await getAllUsers();
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    return {
        users,
        getAllUsers,
        fetchCurrentUser,
        create
    };
});

export default UsuarioStore;