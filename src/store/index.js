import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useStore = defineStore('store', () => {
  const flagsData = ref({ data: null })
  const countrySelected = reactive({ data: null })

  const setFlagsData = (results) => {
    flagsData.value.data = results
  }
  const setCountrySelected = (data) => countrySelected.data = data

  return {
    flagsData,
    setFlagsData,
    countrySelected,
    setCountrySelected,
  }
})