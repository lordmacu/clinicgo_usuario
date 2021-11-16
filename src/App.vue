<template>
  <div id="app">
    <div  v-if="isInitialized">
    <transition name="fade" mode="out-in">
    <router-view/>
      </transition>
    </div>
    <div style="height:90vh" v-else>
      <div style="padding-top:Calc(50vh - 100px);">
        <img src="@/assets/logo3.png" style="max-height:60px;" alt="Imagen"> 
        <div class="loader"></div>
      </div>

    </div>


  </div>
</template>

<script>
import axios from 'axios'
import JQuery from 'jquery'
import {mapActions, mapGetters} from 'vuex';
window.$ = JQuery

export default {
  name: 'Principal',
  data() {
    return {
      highest: 2,
      cargando:false,
    }
  },
    methods:{
      ...mapActions(['initialize', 'vaciarCarroAction', 'getUsuario']),
    
  },
  computed:{
    ...mapGetters(['comunas', 'regiones', 'examenes', 'comunas_usadas', 'examenes_agregados', 'usuario_datos']),
    
    isInitialized(){
      if (this.comunas.length > 0 &&  this.regiones.length > 0 && !this.cargando)
        return true;
      return false;
    }
  },
  created(){
    this.initialize();
      if(this.usuario_datos.length == 0 && typeof(localStorage.token_usuario) != "undefined") //Relogear si recarga la pagina
      {
        
        this.cargando = true;
        axios.defaults.headers.common['Authorization'] = localStorage.token_usuario
        this.getUsuario().then(e=>{this.cargando = false; }).catch(e=>{this.cargando = false;});
        
      }
    for(var i = 0; i < this.examenes_agregados.length; i++)
    {
      if (this.examenes_agregados[i] == null)
      {
        this.vaciarCarroAction()
        break; 
      }
      if( !this.examenes_agregados[i].hasOwnProperty("nombre") || !this.examenes_agregados[i].hasOwnProperty("cantidad"))
      {
        this.vaciarCarroAction()
        break;
      }
    }
  }
}
</script>
<style>



.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #063970;
}
html {
  scroll-behavior: smooth;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: rgb(20, 134, 231);
  font-size: 5px;
  margin: 0px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}

.loader:before {
  left: -4.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 4.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

</style>
