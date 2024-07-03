<script>
import { formatedPopulation } from '../services/formatedPopulation';

export default {
  name: 'ModalContent',
  setup () {
    return {
      formatedPopulation
    }    
  },
  props: {
    countrySelected: Object,
    handleClick: Function
  }
}
</script>

<template>
  <div class="sticky top-0 left-0 right-0 bottom-0">
    <button @click="handleClick"
      class="absolute top-2 right-2 bg-sky-200 rounded-full size-8 grid place-content-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-x text-black">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
    <picture class="block w-full overflow-hidden rounded-xl">
      <img class="w-full h-full object-cover" :src="countrySelected?.data?.flags.png"
        :alt="countrySelected?.data?.flags.alt">
    </picture>
    <div class="flex flex-col gap-3 mt-5">
      <div class="h-2/6 flex items-center gap-3">
        <img class="w-14 h-10" :src="countrySelected.data?.flags.png" :alt="countrySelected.data?.flags.alt">
        <div class="flex flex-col">
          <h6 class="font-bold text-sky-500 text-xl">{{ countrySelected.data?.name.common }}</h6>
          <p class="text-gray-500">{{ countrySelected.data?.region }}</p>
        </div>
      </div>
      <p class="text-sky-500 font-semibold text-xl">Capital: <span class="text-gray-500 font-normal">{{
        countrySelected.data?.capital[0] }}</span></p>
      <p class="text-sky-500 font-semibold text-xl">Language: <span class="text-gray-500 font-normal">{{
        countrySelected.data && Object.values(countrySelected.data?.languages).join(', ') }}</span></p>
      <p class="text-sky-500 font-semibold text-xl">Population: <span class="text-gray-500 font-normal">
          {{ formatedPopulation(countrySelected.data?.population) }} people
        </span></p>
      <p class="text-sky-500 font-semibold text-xl">Status: <span class="text-gray-500 font-normal">{{
        countrySelected.data?.status }}</span></p>
      <p class="text-sky-500 font-semibold text-xl">Start of week: <span class="text-gray-500 font-normal">{{
        countrySelected.data?.startOfWeek }}</span></p>
    </div>
  </div>
</template>
