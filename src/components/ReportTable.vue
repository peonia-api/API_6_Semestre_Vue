<template>
  <div class="outer-container">
    <div class="table-container">
      <div class="export-dropdown">
        <button class="export-button" @click="toggleDropdown">
          <i class="pi pi-file-export"></i> Exportar Tabela
        </button>
        <div v-show="isDropdownOpen" class="dropdown-content">
          <button @click="exportTable('png')">Exportar como PNG</button>
          <button @click="exportTable('jpeg')">Exportar como JPEG</button>
          <button @click="exportTable('pdf')">Exportar como PDF</button>
        </div>
      </div>
      <div class="table-header">
        <div class="table-row">
          <div class="table-column">Ocorrência</div>
          <div class="table-column">Data</div>
          <div class="table-column">Horário</div>
          <div class="table-column">Detalhes</div>
        </div>
      </div>
      <div class="table-body">
        <div v-for="(item, index) in items" :key="index" class="table-row">
          <div class="table-column">
            <i :class="getOccurrenceIconClass(item.direction)"></i>
          </div>
          <div class="table-column">{{ item.date }}</div>
          <div class="table-column">{{ item.time }}</div>
          <div class="table-column">{{ item.details }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
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
      isDropdownOpen: false
    };
  },
  methods: {
    getOccurrenceIconClass(direction) {
      return direction === 'direita' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'; 
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    exportTable(format) {
      const tableElement = document.querySelector('.table-container');
      const fileName = 'tabela_exportada';
      if (format === 'pdf') {
        const pdf = new jsPDF('p', 'pt', 'letter');
        pdf.html(tableElement, {
          callback: () => {
            pdf.save(fileName + '.pdf');
          }
        });
      } else {

   
      html2canvas(tableElement).then(canvas => {
        canvas.toBlob(blob => {
          const fileExtension = format === 'png' ? 'png' : 'jpeg';
          const fileType = format === 'png' ? 'image/png' : 'image/jpeg';
          const file = new File([blob], fileName + '.' + fileExtension, { type: fileType });

          // Cria um objeto URL para o blob
          const url = URL.createObjectURL(file);

          // Cria um link e simula o clique para abrir o explorador de arquivos
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();

          // Libera o objeto URL
          URL.revokeObjectURL(url);
          document.body.removeChild(link);
        }, format === 'png' ? 'image/png' : 'image/jpeg');
      });
      this.isDropdownOpen = false; // Fecha o menu suspenso após a seleção
    }
  }
}
};
</script>



<style scoped>

.outer-container {
  margin: auto;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table-container {
  background-color: white;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 400px;
  max-height: calc(100vh - 200px);
  margin-bottom: 20px;
}

.table-header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 10px 0;
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
  font-size: 1.5rem; 
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
.export-dropdown {
  position: relative;
  display: inline-block;
}

.export-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.export-button:hover {
  background-color: #45a049;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

.export-dropdown:hover .dropdown-content {
  display: block;
}
</style>