<script>
import { useMutation } from '@tanstack/vue-query'
import { searchCountry, getCountriesByContinent } from '../services/flags'
import { ref, watch } from 'vue';
import { useStore } from '../store';
import Popover from 'primevue/popover'
import { useDebounceFn } from '@vueuse/core'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import ButtonModal from '../components/ButtonModal.vue'

export default {
  name: 'Header',
  setup () {
    const country = ref('')
    const continents = ref(['Africa', 'America', 'Asia', 'Europe', 'Oceania'])
    const continentSelected = ref('')
    const { setFlagsData } = useStore()
    const toast = useToast()

    const searchMutation = useMutation({
      mutationFn: searchCountry,
      onSuccess: (data) => {
        if (Array.isArray(data)) {
          setFlagsData(data)
          return
        }
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se encontraron resultados', life: 3000 })
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

    const wordDebounce = useDebounceFn((word) => {
      if (word) {
        searchMutation.mutate(word)
      }
    }, 300)

    watch(country, (word) => {
      if (word) {
        wordDebounce(word)
      }
    })

    const handleInput = (e) => country.value = e.target.value

    function handleClick (continent) {
      if (continent !== continentSelected.value) {
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
      handleDelete,
    }
  },
  components: {
    Popover,
    Toast,
    ButtonModal
  },
  methods: {
    toggle (e) {
      this.$refs.op.toggle(e);
    }
  }
}
</script>

<template>
  <header class="md:p-5">
    <ButtonModal />
    <div class="md:max-w-[600px] w-full m-auto flex md:flex-row flex-col gap-3 bg-white p-4 rounded-xl relative">
      <label class="flex flex-1 flex-col">
        <span class="text-black">Country</span>
        <input v-model="country" @click="toggle" class="outline-none bg-transparent text-black" type="text" placeholder="Search for a country">
      </label>
      <button class="bg-sky-500 text-white px-5 py-2 rounded-2xl">Search</button>
    </div>
  </header>
  <Popover class="mt-5 md:w-[500px] w-[90%]" style="background: white; border: none; margin-top: 30px;" ref="op">
    <div class="bg-white rounded-lg p-3 flex flex-col gap-3 text-black">
      <div class="w-full flex justify-between">
        <p>Filtrar por continentes</p>
        <button @click="handleDelete" class="text-sky-500">Limpiar</button>
      </div>
      <ul class="grid grid-cols-3 gap-3">
        <li v-for="continent in continents" :key="continent"
          class="grid place-content-center border-2 rounded-md cursor-pointer py-2 px-5"
          :class="continentSelected === continent ? 'border-sky-500' : 'border-gray-200'"
          @click="handleClick(continent)">
          {{ continent }}
        </li>
      </ul>
    </div>
  </Popover>
  <Toast />
</template>