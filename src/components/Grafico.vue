<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import useRegistroStore from '@/stores/Registro';
import { ref, onBeforeUnmount } from 'vue';
import { Chart } from 'chart.js/auto';
import { RegistroStore } from '../stores/index';
import { format } from 'date-fns';

Chart.register(...registerables);

const registroRedzone = useRegistroStore();
const chartRef = ref(null);

const initChart = () => {
  const ctx = chartRef.value.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Total de Entradas por Dia', backgroundColor: '#f87979', data: [] }] },
    options: { scales: { y: { beginAtZero: true, ticks: { stepSize: 1, precision: 0 } } } }
  });
  return chart;
};

let chartInstance = null;

onMounted(async () => {
  await registroRedzone.historicRegister();
  nextTick(() => {
    chartInstance = initChart();
    updateGraphData(registroRedzone.dados); // Initial data update
  });
});

watchEffect(() => {
  const newData = registroRedzone.dados;
  if (chartInstance && newData) {
    updateGraphData(newData);
  }
});

const updateGraphData = (data) => {
  if (data) {
    const groupedData = groupDataByDate(data);
    chartInstance.data.labels = Object.keys(groupedData);
    chartInstance.data.datasets[0].data = Object.values(groupedData);
    chartInstance.update();
  }
};

const groupDataByDate = (data) => {
  return data.reduce((acc, item) => {
    if (item.occurrence === '1') {
      const date = format(new Date(item.dateTime), 'dd/MM/yyyy');
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});
};
const criarGrafico = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const dadosSomaPorDia = data.value
    .filter(item => item.occurrence === '1')
    .reduce((acc, item) => {
      const dataFormatada = format(new Date(item.dateTime), 'dd/MM/yyyy');
      acc[dataFormatada] = acc[dataFormatada] ? acc[dataFormatada] + 1 : 1;
      return acc;
    }, {});

  // Ordenando as chaves das datas
  const labels = Object.keys(dadosSomaPorDia).sort((a, b) => {
    const [dayA, monthA, yearA] = a.split('/').map(Number);
    const [dayB, monthB, yearB] = b.split('/').map(Number);
    return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
  });

  const dataValues = labels.map(label => dadosSomaPorDia[label]);

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
  chartInstance = new Chart(ctx, {
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
};

// Adicionando um listener para o evento de atualização de dados

  pegarDados();

  registroRedzone.emitter.on('data-updated', (updatedData) => {
    data.value = updatedData;
    criarGrafico();
  });


onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
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
