<template>
  <div class="home" style="background-color:rgba(250,250,250,1); min-height:100vh;">
    <TopNavD  />
    
<div class="top-spacer"></div>

    <div class="container" style="background-color:rgba(250,250,250,1); text-align:left;">
        <h2>Métodos de pago</h2>
        <!--<div style="padding:10px;"><button class="btn btn-primary" v-on:click="ir_a_pagar_transbank()">
          TransBank
          <div v-if="loading_transbank" class="spinner-border text-light spinner-border spinner-border-sm" style="margin: 0 auto; color:white;" role="status"></div>
          </button></div>-->
        <div style="padding:10px;">
          <button class="btn btn-primary" v-on:click="transferencia()">
          Transferencia 
          <div v-if="loading_transferencia" class="spinner-border text-light spinner-border spinner-border-sm" style="margin: 0 auto; color:white;" role="status"></div>
          </button>
          </div>
      <router-link :to="{name:'Comprobar'}" tag="button" style="margin-top:10px; margin-left:10px; float:left;" class="btn btn-secondary"><b-icon style="transform:translateY(2px);" icon="arrow-left-circle"/> Volver</router-link>

    </div>
    
  </div>

</template>

<script>

import axios from 'axios'
import TopNavD from '@/components/TopNavDFijo.vue'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Home',
  components: {
    TopNavD,
  },
  data() {
    return {
      loading_transferencia:false,
      loading_transbank:false,
    }
  },
  created() {
    if(this.examenes_agregados.length == 0 || this.comuna == -1)
      this.$router.push({ name: 'Home' })
    if(this.inicio == -1 || this.termino == -1 || this.dia == -1 || this.mes == -1 || this.año == -1)
      this.$router.push({ name: 'FechaYHora' })
    if(this.nombre == '' || this.apellido1 == '' || this.rut == '' || this.email == '' || this.telefono == '')
      this.$router.push({ name: 'DatosPersonales' })

  },
  destroyed() {

  },
  methods: {
    ...mapActions(['clickearExamenAction']),

    redirectPost(url, data) 
    {
      var form = document.createElement('form');
      document.body.appendChild(form);
      form.method = 'post';
      form.action = url;

      for (var name in data) 
      {
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = data[name];
          form.appendChild(input);
      }
      form.submit();
    },
    transferencia(){
      if(this.puedeContinuar)
      {
        this.loading_transferencia = true;
        axios.post(window.hostname+'api/reservar_sin_identificar_transferencia',
        {
        examenes:this.examenes_agregados,

        dia:this.dia,
        mes:this.mes,
        año:this.año,

        comuna_id:this.comuna,
        desde:this.inicio,
        hasta:this.termino,

        direccion:this.direccion,
        apellido1:this.apellido1,
        apellido2:this.apellido2,
        nombre:this.nombre,
        departamento:this.departamento,
        rut:this.rut,
        email:this.email,
        telefono:this.telefono,
        n_depto:this.n_depto, //FALTAAA
        info_adicional:this.info_adicional,
        })
        .then(r=>{
          this.$router.push({ path: '/PagoRealizado/'+r.data.orden_id })
          this.loading_transferencia = false;
        })
        .catch(e=>{
          this.loading_transferencia = false;
        })
      }

    },
    ir_a_pagar_transbank()
    {
      if(this.puedeContinuar)
      {
        this.loading_transbank = true;
        axios.post(window.hostname+'api/reservar_sin_identificar_transbank',
        {
        examenes:this.examenes_agregados,

        dia:this.dia,
        mes:this.mes,
        año:this.año,

        comuna_id:this.comuna,
        desde:this.inicio,
        hasta:this.termino,

        direccion:this.direccion,
        apellido1:this.apellido1,
        apellido2:this.apellido2,
        nombre:this.nombre,
        departamento:this.departamento,
        rut:this.rut,
        email:this.email,
        telefono:this.telefono,
        n_depto:this.n_depto, //FALTAAA
        info_adicional:this.info_adicional,
        })
        .then(r=>{
          this.redirectPost(r.data.url, {token_ws: r.data.token})
          this.loading_transbank = false;
        })
        .catch(e=>{
          this.loading_transbank = false;
        })
      }
    },

  },
  computed: {
    ...mapGetters([
    'isLoggedIn', 
    'comuna', 
    'comunas', 
    'examenes_agregados', 
    'inicio', 
    'termino', 
    'dia', 
    'mes', 
    'año',

    'direccion',
    'apellido1',
    'apellido2',
    'nombre',
    'departamento',
    'rut',
    'email',
    'telefono',
    'n_depto', 
    ]),
    puedeContinuar(){
      
      return !this.loading && this.rut.length>7 && this.apellido1.length > 1 && this.nombre.length > 1 && this.direccion.length > 2 && this.error_crear_rut == '' && this.error_crear_correo_electronico == ''
    },
    loading(){
      return this.loading_transferencia || this.loading_transbank
    },
  
    error_crear_correo_electronico(){
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(this.email != '')
        return re.test(this.email) ? '': 'Correo en formato incorrecto.';
      return '';
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
.top-spacer{
  height:130px;
}
.bottom-spacer{
  height:0px;
}
@media only screen and (max-width: 1200px) {
  .top-spacer{
  height:85px;
}
.bottom-spacer{
  height:60px;
}
}

</style>