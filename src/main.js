import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { routes } from './routes/index'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/nora'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app
  .use(pinia)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: 'system',
        cssLayer: false
      }
    }
  })
  .use(ToastService)
  .use(VueQueryPlugin)
  .use(router)
  .mount('#app')
