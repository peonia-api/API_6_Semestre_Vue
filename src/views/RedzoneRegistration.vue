<template>
  <div class="title-redzones">
    <p>Cadastro de Redzones</p>
  </div>  
<UserBox background_color="white_color" class="box_style">
    <div class="Input-Texts">
        <FloatLabel class="field">
           <InputText class="input-field" id="nomeredzone" v-model="redzoneData.name" />
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
           <InputNumber class="input-field" id="capmaximaredzone" v-model="redzoneData.personLimit" />
           <label for="capmaximaredzone">Capacidade Máxima</label>
        </FloatLabel>

        <FloatLabel class="field">
           <MultiSelect class="DropDown-style" v-model="redzoneData.responsibleGuard" Id="id-guards" :options="guards" optionLabel="name"/>
           <label for="id_guards">Guardas</label>
         </FloatLabel>

      <div class="Register-Button">
         <Button label="Cadastrar" severity="contrast" @click="submitForm"></Button>
      </div>
  </div>
  </UserBox>
 
</template>

<script setup>
import UserBox from '@/components/UserBox.vue';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

import { useRouter } from 'vue-router';
import { ref } from "vue";

import RedzoneStore from '../stores/Redzone.ts'; 

const router = useRouter();
const { create } = RedzoneStore(); 

const redzoneData = ref({
  name: '',
  personLimit: '',
  responsibleGuard: ''
});


const submitForm = async () => {
  try {
    await create(redzoneData.value);
  } catch (error) {
    console.log(error);
  } finally {
    router.push("/redzoneList");
  }
};


</script>

<style scoped>
.title-redzones {
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
}

.title-redzones p {
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
}
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
  margin-top: -10px;
}

.box_style {
    border: 2px solid rgb(235, 235, 235);
    width: auto;
    border-radius: 5px;
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
  color: #333; /* Cor do rótulo */
}

.FloatLabel input:focus + label,
.FloatLabel input:not(:placeholder-shown) + label {
  transform: translateY(-100%) scale(0.8);
}

</style>