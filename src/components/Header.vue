<script>
import { useMutation } from '@tanstack/vue-query'
import { searchCountry, getCountriesByContinent, getFlagsData } from '../services/flags'
import { ref, watch } from 'vue';
import { useStore } from '../store';
import Popover from 'primevue/popover'

export default {
  name: 'Header',
  setup () {
    const country = ref('')
    const continents = ref(['Africa', 'America', 'Asia', 'Europe', 'Oceania'])
    const continentSelected = ref('')
    const { setFlagsData } = useStore()
    const { data } = getFlagsData()

    const searchMutation = useMutation({
      mutationFn: searchCountry,
      onSuccess: (data) => {
        setFlagsData(data)
      },
      onError: (error) => {
        console.log(error)
      }
    })

    const searchByContinent = useMutation({
      mutationFn: getCountriesByContinent,
      onSuccess: (data) => {
        setFlagsData(data)
      },
      onError: (error) => {
        console.log(error)
      }
    })

    watch(country, (word) => {
      if (word) {
        searchMutation.mutate(word)
      }
    })

    const handleInput = (e) => country.value = e.target.value

    function handleClick(continent) {
      if (continent !== continentSelected.value){
        continentSelected.value = continent
        searchByContinent.mutate(continent)
      }
    }

    const handleDelete = () => {
      continentSelected.value = ''
    }

    return {
      country,
      searchCountry,
      handleInput,
      continents,
      handleClick,
      continentSelected,
      handleDelete
    }
  },
  components: {
    Popover
  },
  methods: {
    toggle (e) {
      this.$refs.op.toggle(e);
    }
  }
}
</script>

<template>
  <header class="p-5">
    <div class="w-[600px] m-auto flex gap-3 bg-white p-4 rounded-xl relative">
      <label class="flex flex-1 flex-col">
        <span>Country</span>
        <input v-model="country" @click="toggle" class="outline-none" type="text"
          placeholder="Search for a country">
      </label>
      <button class="bg-sky-500 text-white px-5 rounded-2xl">Search</button>
    </div>
  </header>
  <Popover class="mt-5 w-[500px]" ref="op">
    <div class="bg-white rounded-lg p-3 flex flex-col gap-3">
      <div class="w-full flex justify-between">
        <p>Filtrar por continentes</p>
        <button @click="handleDelete" class="text-sky-500">Limpiar</button>
      </div>
      <ul class="grid grid-cols-3 gap-3">
        <li 
          v-for="continent in continents" 
          :key="continent" 
          class="grid place-content-center border-2 rounded-md cursor-pointer py-2 px-5"
          :class="continentSelected === continent ? 'border-sky-500' : 'border-gray-200'"
          @click="handleClick(continent)"
        >
          {{ continent }}
        </li>
      </ul>
    </div>
  </Popover>
</template>