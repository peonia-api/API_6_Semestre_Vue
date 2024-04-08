<template>
  <div class="outer-container">
  <div class="titulo-container">
    <div class="title">
        <p>Relatório de ocorrências</p>
      </div>
      <div class="export-dropdown">
        <img src="@/assets/icons/Export_Icon.png" alt="Exportar Tabela para PDF" @click="exportTable" class="export-icon">
      </div>
  </div>
    <div class="table-container">
      <div class="table-header">
        <div class="table-row">
          <div class="table-column">Ocorrência</div>
          <div class="table-column">Data</div>
          <div class="table-column">Horário</div>
          <div class="table-column">Detalhes</div>
        </div>
      </div>
      <div class="table-body" ref="tableBody">
        <div v-for="(item, index) in visibleItems" :key="index" class="table-row">
          <div class="table-column">
            <i :class="getOccurrenceIconClass(item.direction)"></i>
          </div>
          <div class="table-column">{{ item.date }}</div>
          <div class="table-column">{{ item.time }}</div>
          <div class="table-column">{{ item.details }}</div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf';

export default {
  name: 'ReportTable',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 6
    };
  },
  computed: {
    totalItems() {
      return this.items.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.items.slice(startIndex, endIndex);
    },
    visibleItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.items.slice(startIndex, endIndex);
    }
  },
  methods: {
    getOccurrenceIconClass(direction) {
      return direction === 'direita' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'; 
    },
    getOccurrenceLabel(direction) {
      return direction === 'direita' ? 'entrada' : 'saída'; 
    },
    exportTable() {
      const doc = new jsPDF();
      let startY = 10;

      // Cabeçalho da tabela
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Ocorrência', 10, startY);
      doc.text('Data', 50, startY);
      doc.text('Horário', 90, startY);
      doc.text('Detalhes', 130, startY);

      startY += 10;

      // Linha separadora
      doc.setLineWidth(0.5);
      doc.line(10, startY, 200, startY + 1);

      // Dados da tabela
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      let currentY = startY + 10;
      this.visibleItems.forEach(item => {
        let label = this.getOccurrenceLabel(item.direction);
        doc.text(label, 10, currentY);
        doc.text(item.date, 50, currentY);
        doc.text(item.time, 90, currentY);
        doc.text(item.details, 130, currentY);
        currentY += 10;
      });

      // Salvando o arquivo
      doc.save('tabela_exportada.pdf');
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  width: 80%; 
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color:#f1f1f1;
  padding: 10px;
}

.table-container {
  background-color:#fafafa;
  border-radius: 8px;
  width: 100%;
  min-height: 220px; 
  overflow-y: auto;
}

.table-header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.table-column {
  flex: 1;
  text-align: center;
  margin-right: 20px;
}

.table-body .table-row:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

.pi.pi-arrow-right,
.pi.pi-arrow-left {
  font-size: 1.0rem; 
  margin: 0 5px; 
  border: 2px solid; 
  border-radius: 10px; 
  padding: 5px; 
}

.pi.pi-arrow-right {
  color: green; 
  border-color: green; 
}

.pi.pi-arrow-left {
  color: red; 
  border-color: red; 
}

.titulo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.title {
  font-size: 24px;
  font-weight: bold; 
  margin-left: 40px;
}

.export-icon {
  width: 30px; 
  height: 35px;
}

.export-dropdown{
  margin-right: 60px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination button {
  margin: 0 5px;
}
</style>
