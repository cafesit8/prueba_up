export const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Main.vue') },
  { path: '/view1', name: 'View1', component: () => import('../views/View1.vue') },
  { path: '/view2', name: 'View2', component: () => import('../views/View2.vue') },
]