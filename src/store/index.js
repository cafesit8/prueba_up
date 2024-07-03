import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useStore = defineStore('store', () => {
  const flagsData = ref({ data: null })
  const countrySelected = reactive({ data: null })
  const visible = ref(false)
  const visibleDialog = ref(false)

  const setFlagsData = (results) => {
    if(Array.isArray(results)){
      flagsData.value.data = results
    }
  }
  const setCountrySelected = (data) => countrySelected.data = data

  const closeModal = () => visible.value = false
  const openModal = () => visible.value = true
  const toggleDialog = () => visibleDialog.value = !visibleDialog.value

  return {
    flagsData,
    setFlagsData,
    countrySelected,
    setCountrySelected,
    visible,
    closeModal,
    openModal,
    visibleDialog,
    toggleDialog
  }
})