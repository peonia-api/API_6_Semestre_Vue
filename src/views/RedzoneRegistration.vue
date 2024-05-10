<template>
<UserBox background_color="blue_color">
    <div class="Input-Texts">
        <FloatLabel class="field">
           <InputText class="input-field" id="nomeredzone" v-model="value" />
           <label for="nomeredzone">Nome</label>
        </FloatLabel>
        <FloatLabel class="field">
           <InputText class="input-field" id="arearedzone" v-model="value" />
           <label for="arearedzone">Área</label>
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
           <InputText class="input-field" id="guardasredzone" v-model="value" />
           <label for="guardasredzone">Guardas</label>
        </FloatLabel>
      <div class="input-container">
        <InputText class="input-field" type="text" placeholder="Função" />
      </div>
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
  width: 350px;
}

.Register-Button {
  text-align: center; 
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