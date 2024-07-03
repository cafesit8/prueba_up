<script>
import Sidebar from './components/Sidebar.vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import Modal from './components/Drawer.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    VueQueryDevtools,
    Modal,
  }
}
</script>

<template>
  <div class="w-full bg-sky-100 h-dvh grid md:grid-cols-[300px_1fr] grid-cols-1">
    <aside class="md:block hidden">
      <Sidebar />
    </aside>
    <main class="md:p-5 p-3 overflow-y-auto flex flex-col gap-7">
      <RouterView />
    </main>
    <Modal>
      <Sidebar />
    </Modal>
  </div>
  <VueQueryDevtools />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
