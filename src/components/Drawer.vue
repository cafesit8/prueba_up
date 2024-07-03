<script>
import Drawer from 'primevue/drawer'
import SideBar from './Sidebar.vue'
import { useStore } from '../store';
import { computed } from 'vue';

export default {
  name: 'Modal',
  setup () {
    const store = useStore()
    const visible = computed(() => store.visible)
    const closeModal = () => store.closeModal()

    return {
      visible,
      closeModal
    }
  },
  components: {
    Drawer,
    SideBar
  }
}
</script>

<template>
  <Drawer v-model:visible="visible" class="relative" :showCloseIcon="false" style="background: #4b5563; padding: 0;">
    <button @click="closeModal" class="absolute right-3 top-3 bg-sky-200 rounded-full size-8 grid place-content-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-x text-black">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
    <slot />
  </Drawer>
</template>