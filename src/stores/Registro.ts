// src/stores/Registro.ts
import { defineStore } from 'pinia';
import { getRequest } from '../utils/services/axios';
import { ref } from 'vue';
import type { Register } from '../interfaces/RegisterRedzone';
import stompClient from '../websocket';

const useRegistroStore = defineStore('registro', () => {
  const dados = ref<Register[]>([]);
  const currentCount = ref(0);

  const historicRegister = async () => {
    const response = await getRequest('all');
    dados.value = response.data.reverse();
    updateCurrentCount(); // Atualiza a contagem inicial
  };

  const connectWebSocket = () => {
    stompClient.connect({}, (frame: string) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/records', (message) => {
        const newRecord: Register = JSON.parse(message.body);
        dados.value.unshift(newRecord);
        currentCount.value = newRecord.count; // Atualiza a contagem com base no campo `count`
        console.log(`Nova contagem: ${currentCount.value}`); // Log para verificar a contagem
      });
    });
  };

  const updateCurrentCount = () => {
    // Atualiza a contagem inicial com base no último registro
    if (dados.value.length > 0) {
      currentCount.value = dados.value[0].count;
    } else {
      currentCount.value = 0;
    }
    console.log(`Contagem inicial: ${currentCount.value}`); // Log para verificar a contagem inicial
  };

  return {
    dados,
    currentCount,
    historicRegister,
    connectWebSocket,
  };
});

export default useRegistroStore;
