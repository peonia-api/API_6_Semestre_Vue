<template>
    <UserBox background_color="blue_color">
        <div class="Input-Texts">
            <div class="input-container">
                <InputText type="text" placeholder="Nome" />
            </div>
            <div class="input-container">
                <InputText type="text" placeholder="Descrição" />
            </div>
            <div>
                <select class="input-select">
                    <option selected disabled>Responsável</option>
                    <option value="testteet" >teste</option>
                    <option value="testteet" >teste2</option>
                </select>
            </div>
        </div>
        <div class="Register-Button">
            <Button label="Cadastrar" severity="contrast"></Button>
        </div>
    </UserBox>
</template>


<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import UserBox from '@/components/UserBox.vue';


</script>

<style scoped>
.send-image {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.send-image img {
    width: 110px;
    height: 110px;
    margin-bottom: 20px;
    margin-top: -40px;
}

.Input-Texts {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.input-container {
    margin-bottom: 20px;
}

.input-text {
    width: 80%;
}
.input-select {
    width: 100%;
    border-radius: 5px;
    height: 37px;
    margin-bottom: 20px;
    font-size: 1rem;
    color: #334155
}

</style>