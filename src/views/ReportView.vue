<template>
  <div  class="main-container">
    <ReportTable :items="tableData" />
  </div>
</template>

<script>
import ReportTable from '../components/ReportTable.vue';

export default {
  components: {
    ReportTable
  },
  data() {
    return {
      tableData: [
        { direction: 'direita', date: '01/01/2022', time: '10:00', details: 'Detalhes da ocorrência 1' },
        { direction: 'esquerda', date: '02/01/2022', time: '11:00', details: 'Detalhes da ocorrência 2' },
        { direction: 'direita', date: '01/01/2022', time: '10:00', details: 'Detalhes da ocorrência 1' },
        { direction: 'esquerda', date: '02/01/2022', time: '11:00', details: 'Detalhes da ocorrência 2' },
        { direction: 'direita', date: '01/01/2022', time: '10:00', details: 'Detalhes da ocorrência 1' },
        { direction: 'esquerda', date: '02/01/2022', time: '11:00', details: 'Detalhes da ocorrência 2' },
        { direction: 'direita', date: '01/01/2022', time: '10:00', details: 'Detalhes da ocorrência 1' },
        { direction: 'esquerda', date: '02/01/2022', time: '11:00', details: 'Detalhes da ocorrência 2' },
        { direction: 'direita', date: '01/01/2022', time: '10:00', details: 'Detalhes da ocorrência 1' },
        
      ]
    };
  }
};
</script>

<style scoped>
  html,
  body {
    margin: 0;
    padding: 0;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 150px); 
    width: 100%;
    justify-content: center;
    align-items: center;
  }
</style>

