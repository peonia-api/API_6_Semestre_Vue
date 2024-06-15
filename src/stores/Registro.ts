import { defineStore } from 'pinia';
import { getRequest } from '../utils/services/axios';
import { ref } from 'vue';
import type { Register } from '../interfaces/RegisterRedzone';
import stompClient from '../websocket';
import mitt from 'mitt'; // biblioteca para manipulação de eventos

const emitter = mitt(); // instância do emissor de eventos

const useRegistroStore = defineStore('redzone', () => {
  const dados = ref<Register[]>([]);

  const historicRegister = async () => {
    const response = await getRequest('all');
    dados.value = response.data.reverse();
  };

  const getRegisterByPeriod = async (startDate: string, endDate: string) => {
       const response = await getRequest("/date-range", {startDate, endDate});
       dados.value = response.data.reverse();
       emitter.emit('data-updated', dados.value); // emitir evento quando os dados são atualizados
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
    getRegisterByPeriod,
    emitter // retornar o emissor para que possa ser acessado em outros componentes
  };
});

export default useRegistroStore;
