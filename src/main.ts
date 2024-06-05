import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';

import App from './App.vue';
import router from './router';

import Button from 'primevue/button';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('PrimeButton', Button) 

app.mount('#app')