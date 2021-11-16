import Vue from 'vue'
import BootstrapVue, { IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Meta from 'vue-meta'
import AOS from 'aos'
import 'aos/dist/aos.css'

//Vue.config.productionTip = false


import 'bootstrap';
import 'jquery'
import 'popper.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGeolocation from 'vue-browser-geolocation';
import VueGtag from "vue-gtag";


Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;

//window.hostname = 'https://clinicgobackend.clinicgo.cl/';
//window.hostname = 'http://192.168.50.142:5000/'
window.hostname = 'http://190.153.138.36:5000/'
//window.hostname = 'http://localhost:5000/';



Vue.use(VueGtag, {config: { id: "UA-209984696-1" }});
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGeolocation);
Vue.use(Meta)

new Vue({
  created() {
    AOS.init()
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
