<template>
  <div>
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