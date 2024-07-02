import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { routes } from './routes/index'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app
.use(pinia)
.use(PrimeVue, { unstyled: true })
.use(VueQueryPlugin)
.use(router)
.mount('#app')
