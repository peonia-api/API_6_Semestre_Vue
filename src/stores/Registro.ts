import { defineStore } from 'pinia';
import { getRequest } from '../utils/services/axios';
import { ref } from 'vue';
import type { Register } from '../interfaces/RegisterRedzone';
import stompClient from '../websocket';

const useRegistroStore = defineStore('redzone', () => {
  const dados = ref<Register[]>([]);

  const historicRegister = async () => {
    const response = await getRequest('all');
    dados.value = response.data.reverse();
  };

  const connectWebSocket = () => {
    stompClient.connect({}, (frame: string) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/records', (message) => {
        const newRecord: Register = JSON.parse(message.body);
        dados.value.unshift(newRecord);
      });
    });
  };

  return {
    dados,
    historicRegister,
    connectWebSocket,
  };
});

export default useRegistroStore;
