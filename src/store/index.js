import Vue from 'vue'
import Vuex from 'vuex'
import principal from './modules/principal';
import carrito from './modules/carrito';
import usuario from './modules/usuario';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    principal,
    carrito,
    usuario,
  }
})
