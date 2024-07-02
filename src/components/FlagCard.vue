<script>
import { useStore } from '../store/index'

export default {
  name: 'FlagCard',
  setup () {
    const { setCountrySelected, flagsData, countrySelected } = useStore()

    return {
      setCountrySelected,
      flagsData,
      countrySelected
    }
  },
  props: {
    flagUrl: String,
    flagAlt: String,
    countryName: String,
    region: String,
    countryData: Object
  },
  methods: {
    handleClick () {
      this.setCountrySelected(this.countryData)
    }
  }
}
</script>

<template>
  <article @click="handleClick" class="rounded-xl overflow-hidden flex flex-col max-h-60 cursor-pointer"
    :class="countrySelected.data && countrySelected.data?.name.common === countryName ? 'bg-sky-500' : 'bg-white'">
    <picture class="block w-full h-4/6">
      <img class="w-full h-full object-cover" :src="flagUrl" :alt="flagAlt">
    </picture>
    <div class="p-3 h-2/6 flex items-center gap-3">
      <img class="w-14 h-10" :src="flagUrl" :alt="flagAlt">
      <div class="flex flex-col w-full">
        <h6 :class="countrySelected.data && countrySelected.data?.name.common === countryName ? 'text-white' : ''" class="font-bold text-sky-500 w-full truncate text-xl">{{ countryName }}</h6>
        <p :class="countrySelected.data && countrySelected.data?.name.common === countryName ? 'text-white' : ''" class="text-gray-500">{{ region }}</p>
      </div>
    </div>
  </article>
</template>