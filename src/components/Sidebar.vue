<template>
  <div class="bg-gray-600 md:p-5 p-2 flex flex-col gap-5 h-full">
    <picture class="w-full bg-white h-20 rounded-md grid place-content-center text-black">
      Logo
    </picture>
    <ul class="flex flex-col gap-1">
      <RouterLink @click="closeModal" v-for="item in items" :key="item.label" exactActiveClass="text-gray-600 bg-white" :to="item.route"
        class="p-2 rounded-lg font-semibold">
        {{ item.label }}
      </RouterLink>
    </ul>
  </div>
</template>

<script>
import { useStore } from '../store';

export default {
  name: 'Sidebar',
  setup () {
    const { closeModal } = useStore()
    
    return {
      closeModal
    }
  },
  data () {
    return {
      items: [
        {
          label: 'Home',
          route: '/'
        },
        {
          label: 'View 1',
          route: '/view1'
        },
        {
          label: 'View 2',
          route: '/view2'
        }
      ]
    };
  }
}
</script>