import { defineStore } from "pinia";
import { createUser, deleteUser, getCurrentUser, getUser, getUserbyId } from "../utils/services/axiosUser";
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

    const deleteUsuario = async (userId: string) => {
        try {
            await deleteUser(userId);
            await getAllUsers();
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    };
      
    const findByIdUser = async (userId: string) => {
        try {
            const res = await getUserbyId(userId);
            return res;   
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw error;
        }
    };
    return {
        users,
        getAllUsers,
        fetchCurrentUser,
        deleteUsuario,
        findByIdUser,
        create
    };
});

export default UsuarioStore;