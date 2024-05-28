<template>
  <div class="chart-container">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart } from 'chart.js/auto';
import { RegistroStore } from '../stores/index';
import { format } from 'date-fns';

const registroRedzone = RegistroStore();

const data = ref([]);
const chart = ref(null);

onMounted(() => {
  pegarDados();
});

const props = defineProps({
  redzoneName: {
    type: String,
    required: true
  },
});

const pegarDados = async () => {
  try {
    await registroRedzone.historicRegister();
    data.value = registroRedzone.dados.filter(item => item.room === props.redzoneName);
    
    data.value.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    console.log(data.value);

    criarGrafico();
  } catch (error) {
    console.log('Erro ao obter dados:', error);
  }
}
console.log(props.redzoneName)
const criarGrafico = () => {
  const dadosSomaPorDia = data.value.filter(item => item.occurrence === '1').reduce((acc, item) => {
    const dataFormatada = format(new Date(item.dateTime), 'dd/MM/yyyy');
    acc[dataFormatada] = acc[dataFormatada] ? acc[dataFormatada] + 1 : 1;
    return acc;
  }, {});

  const labels = Object.keys(dadosSomaPorDia);
  const dataValues = Object.values(dadosSomaPorDia);

  const datacollection = ref({
    labels: labels,
    datasets: [
      {
        label: 'Total de Entradas por Dia',
        backgroundColor: '#f87979',
        data: dataValues,
      },
    ],
  });

  const ctx = chart.value.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: datacollection.value,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            precision: 0
          }
        }
      }
    }
  });
}
</script>

<style>
.chart-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px; 
}

.chart-container canvas {
  width: 500px;
  height: 400px; 
}
</style>
