<template>
  <div>
  <div class="home" style="">
    <TopNavD  />
<div class="main-cont">


<div class="top-spacer"></div>
<img class="wave" src="@/assets/curva.svg">

  <div>
    <div class="container" style=" text-align:left;">

      <div class="carta" style="margin-bottom:20px; overflow: hidden; position:relative; background:white; border:1px solid rgb(220, 220, 220); padding: 40px; border-radius:5px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
      <h5>Panel</h5>
        {{usuario_datos.nombre}}  {{usuario_datos.apellido1}} 
        <div>Telefono: {{usuario_datos.telefono}} </div>
        <div>E-mail: {{usuario_datos.email}} </div>
        <div>
          <h5 style="margin-top:20px;">Órdenes</h5>
          <table style="width:100%;">
            <tr>
              <td style="border-bottom:1px solid black;">Dia</td>
              <td style="border-bottom:1px solid black;">Exámenes</td>
              <td style="border-bottom:1px solid black;">Monto total</td>
              <!--<td style="border-bottom:1px solid black;">Resultados</td>-->
            </tr>
          <tr v-for="o in ordenes">              
              <td>{{new Date(o.fecha).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}}</td>
              <td><div v-for="i in o.items">{{i.cantidad}} x {{examenes.filter(x=>{return x.id == i.examen_id})[0].nombre}}</div></td>
              <td>${{Intl.NumberFormat('de-DE').format(o.monto_pagado)}}</td>
              <!--<td style="text-align:center;"><b-icon style="color:rgb(20, 134, 231); cursor:pointer;" icon="cloud-download"></b-icon></td>-->
          </tr>
            <tr>
              <td style="border-top:1px solid black;"></td>
              <td style="border-top:1px solid black;"></td>
              <td style="border-top:1px solid black;"></td>
              <!--<td style="border-top:1px solid black;"></td>-->
            </tr>
        </table>
        </div>
        <button v-on:click="logoutUsuario()" style="margin-top:10px;" class="btn btn-danger"> Salir </button>
      </div>

      </div>
    </div>
  </div>



    </div>
  </div>

</template>

<script>
import axios from 'axios'
import TopNavD from '@/components/TopNavDFijo.vue'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Home',
  props:['id', 'token'],
  components: {
    TopNavD,
  },
  data() {
    return {
      loaded:false,
      loading:false,
      focused_rut:false,
      focused_contraseña:false,
      pass1:'',
      pass2:'',
      apellido1:'',
      nombre:'',
      rut:'',
      telefono:'',
      estado:0,
      registrado:false,
      tipo:0,
      ordenes:[],
    }
  },
  created() {
    this.get_ordenes()

  },
  destroyed() {

  },
  methods: {
    ...mapActions(['clickearExamenAction', 'vaciarCarroAction', 'logoutUsuario']),
    get_ordenes(){
      ///api/usuario/get_ordenes
        axios.get(window.hostname+'api/usuario/get_ordenes')
        .then(r => 
        {
          this.ordenes = r.data.ordenes
        })
        .catch(e=>{          
          this.cargando_disponibles = false;

        })
    },

  },
  computed: {
    ...mapGetters(['isLoggedIn','usuario_datos', 'comuna', 'comunas', 'examenes_agregados', 'examenes']),
  passwordError(){
    if (this.pass1.length <8)
      return 'Deben ser al menos 8 caracteres'
    if(this.pass1 != this.pass2)
      return 'Contraseñas deben ser iguales'
    return ''
  },
  puedeContinuar(){
    return this.rut.length>7 &&  this.apellido1.length > 1 && this.nombre.length > 1 && this.error_crear_rut == '' && this.telefono.length > 6 && this.passwordError == '';
  },
  puedeContinuar2(){
    return this.passwordError == '';
  },

  error_crear_rut(){
      function dv(T){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
          S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
    }
    function validaRut (rutCompleto) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
          return 'Formato invalido.';
        var tmp 	= rutCompleto.split('-');
        var digv	= tmp[1]; 
        var rut 	= tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
          return (dv(rut) == digv ) ? '' : 'Digito verificador incorrecto.';
      }
    if (this.rut != '')
      return validaRut(this.rut)
    return ''
    },

  },
}
</script>
<style scoped>
.main-cont{
  
}
.opcionClicked{
  border:2px solid rgb(20, 134, 231); 
  color:white;
  background: rgb(20, 134, 231);
}
.opcionClicked:hover{
  color:white;

}
.opcionNoClicked{
  border:2px solid rgb(20, 134, 231); 
  color:rgb(20, 134, 231);
}
.opcionNoClicked:hover{
  border:2px solid rgb(20, 134, 231); 
  color:white;
  background: rgb(20, 134, 231);
}
.parent {
  overflow: hidden; /* required */
  width: 50%; /* for demo only */
  height: 250px /* some non-zero number */;
  margin: 25px auto; /* for demo only */
  border:1px solid grey; /* for demo only */
  position: relative; /* required  for demo*/
}

.ribbon {
  margin: 0;
  padding: 0;
  background: rgb(20, 134, 231);
  color:white;
  padding:1em 0;
  position: absolute;
  top:0;
  right:0;
  transform: translateX(30%) translateY(0%) rotate(45deg);
  transform-origin: top left;
}
.nombre, .apellido1, .rut{
  width:33%
}
.ribbon:before,
.ribbon:after {
  content: '';
  position: absolute;
  top:0;
  margin: 0 -1px; /* tweak */
  width: 100%;
  height: 100%;
  background: rgb(20, 134, 231);
}
.ribbon:before {
  right:100%;
}
.alerta{
  padding:10px;
  position:absolute;
  width:200px;
  right:3px;
  top: -41px;
  font-size: 12px;
  transition-duration: 0.2s;
}
.alerta:after{

  content:'';
  right:100px;
  top:33px;
  width: 10px;
  height: 10px;
  background: rgb(248, 215, 218);
  border-right: 1px solid rgb(236, 172, 207);
  border-bottom: 1px solid rgb(236, 172, 207);
  transform: rotate(45deg);
  position: absolute;
}

.ribbon:after {
  left:100%;
}
.bottom-spacer{
  height:0px;
}
.top-spacer{
  height:130px;
}
@media only screen and (max-width: 540px) {
.nombre, .apellido1, .apellido2, .rut, .email, .telefono{
  width: 100% !important;
  display: block !important;;
}
.email{
  margin-bottom: 20px;
}
.telefono, .apellido1, .rut{
  padding:0px !important;
}
.nombre, .apellido2, .apellido1{
  margin-bottom: 10px;
}

}
@media only screen and (max-width: 1200px) {
  .top-spacer{
  height:85px;
}
.bottom-spacer{
  height:60px;
}
}
.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}
@media screen  and (max-width: 540px) {
  .main-cont{
    margin-top:0px;
  }
}
</style>