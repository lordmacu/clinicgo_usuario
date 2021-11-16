import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Home from '../components/Home.vue'
import Comprobar from '../components/Comprobar.vue'
import FechaYHora from '../components/FechaYHora.vue'
import DatosPersonales from '../components/DatosPersonales.vue'
import PagoRealizado from '../components/PagoRealizado.vue'
import MetodosDePago from '../components/MetodosDePago.vue'
import Login from '../components/Login.vue'
import VerificarCuenta from '../components/VerificarCuenta.vue'
import PanelUsuario from '../components/PanelUsuario.vue'
import OrdenMedica from '../components/OrdenMedica.vue'
import Meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Comprobar',
    name: 'Comprobar',
    component: Comprobar
  },
  {
    path: '/MetodosDePago',
    name: 'MetodosDePago',
    component: MetodosDePago
  },
  {
    path: '/FechaYHora',
    name: 'FechaYHora',
    component: FechaYHora
  },
  {
    path: '/OrdenMedica',
    name: 'OrdenMedica',
    component: OrdenMedica
  },
  {
    path: '/PagoRealizado/:id',
    name: 'PagoRealizado',
    component: PagoRealizado,
  },
  {
    path: '/VerificarCuenta/:id/:token',
    name: 'VerificarCuenta',
    component: VerificarCuenta,
  },
  {
    path: '/DatosPersonales',
    name: 'DatosPersonales',
    component: DatosPersonales
  },
  {
    path: '/PanelUsuario',
    name: 'PanelUsuario',
    component: PanelUsuario,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
          next()
          return
    }
    next('/Login') 

    
    }
  else if(to.matched.some(record => record.meta.requiresNotAuth)){
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next() 
  }
})

export default router
