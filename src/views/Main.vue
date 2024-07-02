<script>
import { computed, onMounted, watch, watchEffect } from 'vue';
import Header from '../components/Header.vue'
import { getFlagsData } from '../services/flags';
import { useStore } from '../store/index'
import FlagCard from '../components/FlagCard.vue'

export default {
  name: 'Main',

  setup () {
    const { setFlagsData, flagsData, setCountrySelected, countrySelected, visible } = useStore()
    const { isFetching, data, error, isError } = getFlagsData()

    watch(data, (newData) => {
      if (newData) {
        setFlagsData(newData)
      }
    })

    const countryList = computed(() => {
      return flagsData
    })

    return {
      isFetching,
      error,
      isError,
      flagsData,
      setCountrySelected,
      countrySelected,
      visible,
      countryList
    }
  },
  components: {
    Header,
    FlagCard,
  }
}
</script>

<template>
  <Header />
  <div v-if="isFetching">Loading...</div>
  <div v-else-if="isError">{{ error.message }}</div>
  <section v-else class="container grid"
    :class="countrySelected.data ? '[grid-template-columns:1fr_450px] gap-5' : 'grid-cols-1'">
    <div class="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
      <FlagCard v-for="item in flagsData?.data" :key="item.name?.common" :flagUrl="item.flags.png"
        :flagAlt="item.flags.alt" :countryName="item.name.common" :region="item.region" :countryData="item" />
    </div>
    <aside class="flex flex-col gap-6 bg-white p-5 relative group" :class="countrySelected.data ? 'block' : 'hidden'">
      <div class="sticky top-0 left-0 right-0 bottom-0">
        <button @click="setCountrySelected(null)"
          class="absolute top-2 right-2 bg-sky-200 rounded-full size-8 invisible group-hover:visible">
          X
        </button>
        <picture class="block w-full overflow-hidden rounded-xl">
          <img class="w-full h-full object-cover" :src="countrySelected.data?.flags.png"
            :alt="countrySelected.data?.flags.alt">
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
          <p class="text-sky-500 font-semibold text-xl">Lenguage: <span class="text-gray-500 font-normal">{{
            countrySelected.data && Object.values(countrySelected.data?.languages).join(', ') }}</span></p>
          <p class="text-sky-500 font-semibold text-xl">Population: <span class="text-gray-500 font-normal">{{
            countrySelected.data?.population }} people</span></p>
          <p class="text-sky-500 font-semibold text-xl">Status: <span class="text-gray-500 font-normal">{{
            countrySelected.data?.status }}</span></p>
          <p class="text-sky-500 font-semibold text-xl">Start of week: <span class="text-gray-500 font-normal">{{
            countrySelected.data?.startOfWeek }}</span></p>
        </div>
      </div>
    </aside>
  </section>
</template>
