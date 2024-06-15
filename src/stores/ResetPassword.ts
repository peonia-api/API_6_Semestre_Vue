import { defineStore } from "pinia";
import { postRequestRest, resetPassword } from "../utils/services/axiosPassword";
import { ref } from "vue";

const ResetPasswordStore = defineStore('password', () => {
    const email = ref<string>('');
    const authCode = ref<string>('');
    const newPassword = ref<string>('');

    const requestPasswordReset = async (email: string) => {
        try {
            const res = await postRequestRest('request-reset', { email });
            console.log('Código enviado:', res.data);
        } catch (error) {
            console.error('Erro ao enviar código:', error);
            throw error;
        }
    };

    const resetUserPassword = async (code: string, newPassword: string) => {
        try {
            const res = await resetPassword(code, newPassword);
            console.log('Senha redefinida:', res.data);
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            throw error;
        }
    };

    return {
        email,
        authCode,
        newPassword,
        requestPasswordReset,
        resetUserPassword
    };
});

export default ResetPasswordStore;
