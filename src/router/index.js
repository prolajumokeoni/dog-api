import { createRouter, createWebHistory } from 'vue-router'
import DogListView from '../views/DogListView.vue'
import DogDetailsView from '../views/DogDetailsView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: DogListView,
  },
  {
    path: '/dog/:breed',
    name: 'details',
    component: DogDetailsView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/DogDetailsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
