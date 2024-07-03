<script>
import { computed, watch } from 'vue';
import Header from '../components/Header.vue'
import { getFlagsData } from '../services/flags';
import { useStore } from '../store/index'
import FlagCard from '../components/FlagCard.vue'
import Modal from '../components/Drawer.vue'
import Sidebar from '../components/Sidebar.vue';
import DialogInfo from '../components/Dialog.vue'
import ModalContent from '../components/ModalContent.vue'

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
  methods: {
    handleClick () {
      this.setCountrySelected(null)
    }
  },  
  components: {
    Header,
    FlagCard,
    Modal,
    Sidebar,
    DialogInfo,
    ModalContent
  }
}
</script>

<template>
  <Header />
  <div class="w-full h-full grid place-content-center text-black" v-if="isFetching"><span class="loader"></span></div>
  <div v-else-if="isError">{{ error.message }}</div>
  <section v-else class="container grid" :class="countrySelected.data ? 'md:[grid-template-columns:1fr_450px] [grid-template-columns:1fr] gap-5' : 'grid-cols-1'">
    <div class="grid gap-4 md:[grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]">
      <FlagCard v-for="item in flagsData?.data" :key="item.name?.common" :flagUrl="item.flags?.png"
        :flagAlt="item.flags?.alt" :countryName="item.name?.common" :region="item.region" :countryData="item" />
    </div>
    <aside class="flex flex-col gap-6 bg-white p-5 relative group" :class="countrySelected.data ? 'md:block hidden' : 'hidden'">
      <ModalContent :countrySelected="countrySelected" :handleClick="handleClick" />
    </aside>
  </section>
  <Modal>
    <Sidebar />
  </Modal>
  <DialogInfo />
</template>

<style lang="css">
/* Agregué este loading desde la página de css loaders (https://cssloaders.github.io/) */
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #4b5563;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  } 
</style>