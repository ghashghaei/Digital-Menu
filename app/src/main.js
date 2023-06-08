import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import ViewList from './Dishes.vue'
import Dish from './Dish.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './styles.css';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/dishes',
      name: 'Dishes',
      component: ViewList
    },
    {
      path: '/dish/:id?',
      name: 'Dish',
      component: Dish
    }
  ]
})

const app = createApp(App)
app.use(router)
app.use(ToastPlugin);
app.mount('#app')