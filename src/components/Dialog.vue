<script>
import Dialog from 'primevue/dialog'
import { useStore } from '../store';
import { computed } from 'vue';
import ModalContent from './ModalContent.vue';

export default {
  name: 'DialogInfo',
  setup () {
    const store = useStore()
    const visible = computed(() => store.visibleDialog)
    const countrySelected = computed(() => store.countrySelected)
    
    function closeDialog() {
      store.setCountrySelected(null)
      store.toggleDialog()
    }

    return {
      visible,
      countrySelected,
      closeDialog
    }
  },
  components: {
    Dialog,
    ModalContent
  }
}
</script>

<template>
  <Dialog class="" v-model:visible="visible" modal :closable="false" :style="{ width: '90%' }">
    <ModalContent :countrySelected="countrySelected" :handleClick="closeDialog" />
  </Dialog>
</template>
