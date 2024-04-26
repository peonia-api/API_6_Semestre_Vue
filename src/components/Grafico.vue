<template>
  <div class="chart-container">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart } from 'chart.js/auto';

const dados = ref([
  { totalEntrada: 12, data: '25/04/2024' },
  { totalEntrada: 4, data: '24/04/2024' },
  { totalEntrada: 6, data: '23/04/2024' },
  { totalEntrada: 11, data: '22/04/2024' },
  { totalEntrada: 9, data: '21/04/2024' },
  { totalEntrada: 15, data: '20/04/2024' },
  { totalEntrada: 18, data: '19/04/2024' }
])

const chart = ref(null);

onMounted(() => {
  const datacollection = ref({
    labels: dados.value.map(item => item.data),
    datasets: [
      {
        label: 'Total Entrada',
        backgroundColor: '#f87979',
        data: dados.value.map(item => item.totalEntrada),
      },
    ],
  });
  const ctx = chart.value.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: datacollection.value
  });
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
