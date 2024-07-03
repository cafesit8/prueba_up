<script>
import { computed } from 'vue';
import { useStore } from '../store/index'

export default {
  name: 'FlagCard',
  props: {
    flagUrl: {
      type: String,
      required: true
    },
    flagAlt: String,
    countryName: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    countryData: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { setCountrySelected, flagsData, countrySelected, toggleDialog } = useStore()

    const isSelected = computed(() => countrySelected.data?.name.common === props.countryName)

    const articleClass = computed(() => isSelected.value ? 'bg-sky-500' : 'bg-white');

    const textClass = computed(() => isSelected.value ? 'text-white' : '');

    function handleClick () {
      setCountrySelected(props.countryData)
      if (window.innerWidth < 640) {
        toggleDialog()
      }
    }

    return {
      handleClick,
      articleClass,
      textClass,
      flagsData,
      countrySelected
    }
  }
}
</script>


<template>
  <article @click="handleClick" class="rounded-xl overflow-hidden flex flex-col max-h-60 cursor-pointer w-full"
    :class="articleClass">
    <picture class="block w-full h-4/6">
      <img class="w-full h-full object-cover" :src="flagUrl" :alt="flagAlt" />
    </picture>
    <div class="p-3 h-2/6 flex items-center gap-3">
      <img class="md:w-14 w-8 md:h-10 h-auto" :src="flagUrl" :alt="flagAlt" />
      <div class="flex flex-col w-full">
        <h6 :class="textClass" class="font-bold text-sky-500 truncate md:text-xl text-base">
          {{ countryName }}
        </h6>
        <p :class="textClass" class="text-gray-500 md:text-base text-sm">
          {{ region }}
        </p>
      </div>
    </div>
  </article>
</template>