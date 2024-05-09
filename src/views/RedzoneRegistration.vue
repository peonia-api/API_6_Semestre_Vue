<template>
<UserBox background_color="blue_color">
    <div class="Input-Texts">
        <FloatLabel>
           <InputText id="nomeredzone" v-model="value" />
           <label for="nomeredzone">Nome</label>
        </FloatLabel>
        <FloatLabel>
           <InputText id="arearedzone" v-model="value" />
           <label for="arearedzone">Área</label>
        </FloatLabel>
        <FloatLabel>
           <InputText id="responsaveldzone" v-model="value" />
           <label for="responsavelredzone">Responsável</label>
        </FloatLabel>
        <FloatLabel>
           <InputText id="capmaximaredzone" v-model="value" />
           <label for="capmaximaredzone">Capacidade Máxima</label>
        </FloatLabel>
        <FloatLabel>
           <InputText id="guardasredzone" v-model="value" />
           <label for="guardasredzone">Guardas</label>
        </FloatLabel>
      <div class="input-container">
        <InputText type="text" placeholder="Função" />
      </div>
    </div>
  </UserBox>
 


</template>

<script setup>
import UserBox from '@/components/UserBox.vue';
import InputText from 'primevue/inputtext';

import FloatLabel from 'primevue/floatlabel';



</script>

<style scoped>
.Input-Texts {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}


.input-container {
  margin-bottom: 20px;
}

.Input-Text {
  width: 80%;
}

.FloatLabel {
  position: relative;
  margin-bottom: 20px;
}

.FloatLabel label {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
  transform-origin: 0 0;
  color: #333; /* Cor do rótulo */
}

.FloatLabel input:focus + label,
.FloatLabel input:not(:placeholder-shown) + label {
  transform: translateY(-100%) scale(0.8);
}

</style>