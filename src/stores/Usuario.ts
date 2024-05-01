import { defineStore } from "pinia";
import { createUser, getUser } from "../utils/services/axiosUser";
import type { Usuario } from "@/interfaces/User";
import { ref } from "vue";

const UsuarioStore = defineStore('usuario', () => {
    const users = ref<Usuario[]>([]);

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
        create
    };
});

export default UsuarioStore;