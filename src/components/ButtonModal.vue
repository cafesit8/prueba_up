<script>
import { useStore } from '../store';

export default {
  name: 'ButtonModal',
  setup () {
    const { openModal } = useStore()

    return {
      openModal
    }
  }
}
</script>

<template>
  <button class="md:hidden" @click="openModal">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-align-left text-black">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6l16 0" />
      <path d="M4 12l10 0" />
      <path d="M4 18l14 0" />
    </svg>
  </button>
</template>