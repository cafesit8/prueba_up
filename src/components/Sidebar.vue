<template>
  <aside class="bg-gray-600 p-5 flex flex-col gap-5">
    <picture class="w-full bg-white h-20 rounded-md grid place-content-center">
      Logo
    </picture>
    <ul class="flex flex-col gap-1">
      <RouterLink v-for="item in items" :key="item.label" exactActiveClass="text-gray-600 bg-white" :to="item.route"
        class="p-2 rounded-lg font-semibold text-white">
        {{ item.label }}
      </RouterLink>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
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