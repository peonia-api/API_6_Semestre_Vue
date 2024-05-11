<template>
<UserBox background_color="white_color" class="box_style">
    <div class="Input-Texts">
        <FloatLabel class="field">
           <InputText class="input-field" id="nomeredzone" v-model="value" />
           <label for="nomeredzone">Nome</label>
        </FloatLabel>

        <FloatLabel class="field">
           <Dropdown class="DropDown-style" v-model="selectedArea" inputId="id-area" :options="areas" optionLabel="name"/>
           <label for="id-area">Área</label>
        </FloatLabel>

        <FloatLabel class="field">
           <InputText class="input-field" id="responsaveldzone" v-model="value" />
           <label for="responsavelredzone">Responsável</label>
        </FloatLabel>

        <FloatLabel class="field">
           <InputText class="input-field" id="capmaximaredzone" v-model="value" />
           <label for="capmaximaredzone">Capacidade Máxima</label>
        </FloatLabel>

        <FloatLabel class="field">
           <Dropdown class="DropDown-style" v-model="selectedGuard" inputId="id-guards" :options="guards" optionLabel="name"/>
           <label for="dd-city">Guardas</label>
         </FloatLabel>

         <FloatLabel class="field">
           <InputText class="input-field" id="funcaoredzone" v-model="value" />
           <label for="funcaoredzone">Função</label>
        </FloatLabel>

      <div class="Register-Button">
      <Button label="Cadastrar" severity="contrast"></Button>
    </div>
  </div>
  </UserBox>
 


</template>

<script setup>
import UserBox from '@/components/UserBox.vue';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

import { ref } from "vue";

const selectedGuard = ref();
const guards = ref([
    { name: 'Guarda 1', code: 'G1' },
    { name: 'Guarda 2', code: 'G2' },
    { name: 'Guarda 3', code: 'G3' },
]);

const selectedArea = ref();
const areas = ref([
    { name: 'Área 1', code: 'A1' },
    { name: 'Área 2', code: 'A2' },
    { name: 'Área 3', code: 'A3' },
]);




</script>

<style scoped>
.Input-Texts {
  display: flex;
  flex-direction: column;
  margin-top: -30px;
}


.input-container {
  margin-bottom: 20px;
}

.Input-Text {
  width: 80%;
}

.FloatLabel {
  position: relative;
}

.field {
  margin-bottom: 25px;
}

.input-field {
  width: 430px;
}

.Register-Button {
  text-align: center; 
}

.box_style {
    border: 2px solid #333;
    width: auto;
  }

  .DropDown-style {
     width: 430px;
  }

.FloatLabel label {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
  transform-origin: 0 0;
  color: #333; 
}

.FloatLabel input:focus + label,
.FloatLabel input:not(:placeholder-shown) + label {
  transform: translateY(-100%) scale(0.8);
}

</style>