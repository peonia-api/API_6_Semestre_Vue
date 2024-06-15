<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import useRegistroStore from '@/stores/Registro';
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
