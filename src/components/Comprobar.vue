<template>
  <div class="home" style="background-color:rgba(250,250,250,1); min-height:100vh;">
    <TopNavD  />
<div class="top-spacer"></div>
    <div class="container" style="background-color:rgba(250,250,250,1); text-align:left; position:relative;">
      <h2>Comprobar orden en {{direccion}}, {{comunas.filter(x=>{return x.id == comuna})[0].Nombre}}</h2>

      <div class="alert alert-info" style="background-color:rgb(20, 134, 231, 0.2) !important;"  role="alert">
        <div>
          <img src="@/assets/icon/no-junk-food.png" style="max-height:20px; transform:translateY(-3px);" alt="Imagen">
          Recuerda que <strong>no podrás  consumir alimentos</strong> en las <strong> 8 horas anteriores</strong> a la toma de muestra, con la excepción de exámenes micro biológicos y PCR.
        </div>
        <div style="margin-top:10px;">
          <img src="@/assets/icon/runer-silhouette-running-fast.png" style="max-height:20px;  transform:translateY(-3px);" alt="Imagen">
          Una vez tomada la muestra, recibirás el  <strong>resultado</strong> de manera digital en <strong> menos de 24 horas.</strong>
        </div>
        <div style="margin-top:10px;">
          <img src="@/assets/icon/shield.png" style="max-height:20px;  transform:translateY(-3px);" alt="Imagen">
          Recuerda que tu <strong>muestra</strong> será siempre analizada por <strong> laboratorios certificados </strong>con los más altos estándares aplicables.
        </div>
      </div>

      <p>Has seleccionado un total de {{examenes_agregados.reduce((x, y) => {return x + y.cantidad },0)}} exámenes. A continuación, el detalle de la orden.</p>
      <div style="padding: 10px; border:1px solid rgb(220,220,220);">
        <table style="width:100%;">
          <tr>
            <td class="desktop" style="width:30px;"></td>
            <td>Examen</td>
            <td style="width:150px;">Cantidad</td>

            <td style="width:100px;">Total</td>
          </tr>
          <tr v-for="e in examenes_agregados">
            <td class="desktop" style="padding:4px; color:rgb(108, 193, 252);">
              <!--<b-icon v-on:click="clickearExamenAction(e)"  style="cursor:pointer;" icon="x-circle"/>-->
              </td>
            <td>{{e.nombre}}</td>
            <td >
              <!--<b-icon style="cursor:pointer;" v-on:click="cambiarCantidad(e, 'restar')" icon="dash-circle"/>-->
              {{e.cantidad}} 
              <!--<b-icon style="cursor:pointer;" icon="plus-circle" v-on:click="cambiarCantidad(e, 'sumar')"/>-->
             </td>
            
            <td>${{Intl.NumberFormat('de-DE').format(e.precio*e.cantidad)}}</td>
          </tr>

          <tr>
            <td class="desktop" > </td>
            <td style="padding-top:20px;"></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td class="desktop" style="width:30px; border-top: 1px solid rgb(140,140,140);"></td>
            <td style="border-top: 1px solid rgb(140,140,140); margin-top:40px;"></td>
            <td style="border-top: 1px solid rgb(140,140,140); ">Total exámenes:</td>
            <td style="border-top: 1px solid rgb(140,140,140);">${{Intl.NumberFormat('de-DE').format(examenes_agregados.reduce((x, y)=>{return x+y.precio*y.cantidad}, 0))}}</td>
          </tr>
          <!--
          <tr>
            <td  class="desktop" ></td>
            <td></td>
            <td>Número de personas:</td>
            <td style="text-align:left;"><b-icon style="cursor:pointer;" icon="plus-circle" v-on:click="cambiarCantidadPersonas('sumar')"/> {{n_personas}} <b-icon style="cursor:pointer;" v-on:click="cambiarCantidadPersonas('restar')" icon="dash-circle"/></td>
          </tr>-->
          <tr>
            <td class="desktop"></td>
            <td></td>
            <td style=" vertical-align:top;">Toma de muestra (c/u):</td>
            <td style=""> <div style="text-decoration:line-through;"> <span v-if="n_personas>1">${{Intl.NumberFormat('de-DE').format((costo_servicio+costo_servicio_pendiente))}}</span></div>  <span style="color:rgb(108, 193, 252);">${{  Intl.NumberFormat('de-DE').format(Math.round((costo_servicio+(n_personas*costo_servicio_pendiente))/n_personas)) }}</span> </td>
          </tr>
          <tr>
            <td class="desktop"></td>
            <td></td>
            <td>Total a pagar:</td>
            <td>${{Intl.NumberFormat('de-DE').format(examenes_agregados.reduce((x, y)=>{return x+y.precio*y.cantidad}, 0) + costo_servicio+(n_personas*costo_servicio_pendiente))}}</td>
          </tr>
        </table>
        <div style="width:100%;">
        
        </div>
      </div>
      <div class="tyc-container" >
        <input type="checkbox" id="checkbox" v-model="aceptoTerminos">
         Acepto los 
         <span class="tyc" style="cursor:pointer; color:rgb(20, 134, 231); text-decoration: underline;" v-on:click="viendoTerminos = true;"> Términos y Condiciones</span>
          y las 
         <span class="pdp" style="cursor:pointer; color:rgb(20, 134, 231); text-decoration: underline;" v-on:click="viendoPoliticas = true;"> Políticas de Privacidad</span>
         
         </div>
      <router-link :to="{name:'DatosPersonales'}" tag="button" style="margin-top:10px; float:left;" class="btn btn-secondary"><b-icon style="transform:translateY(2px);" icon="arrow-left-circle"/> Volver</router-link>
      
      <!--<div style="float:right;"><button v-on:click="checkout()" style="margin-top:10px; float:right;" :class="{'btn-success': puedeContinuar, 'btn-danger':!puedeContinuar}" class="btn">Métodos de pago <b-icon style="transform:translateY(2px);" icon="arrow-right-circle"/></button></div>
      -->
      <div style="float:right;"><button v-on:click="transferencia()" style="margin-top:10px; float:right;" :class="{'btn-success': aceptoTerminos && examenes_agregados.length > 0, 'btn-danger':!(aceptoTerminos && examenes_agregados.length > 0)}" class="btn">
        Agendar 
        <b-icon v-if="!loading_transferencia" style="transform:translateY(2px);" icon="calendar"/>
        <div v-if="loading_transferencia" class="spinner-border text-light spinner-border spinner-border-sm" style="margin: 0 auto; color:white;" role="status"></div>
        </button></div>
    </div>
    <div class="bottom-spacer"></div>

    <div v-if="viendoTerminos">
      <div style="position:fixed; background-color:black; height:100vh; width:100vw; top:0px; z-index:10000; opacity:0.5;">


      </div>
      <div style="position:fixed; height:Calc(100vh - 120px); overflow-y: scroll; padding:10px; background:white; top:20px; width:800px; max-width:90%; margin: 0px auto; left: 0; right: 0; opacity:1; z-index:10001;">
          <div class="tyc">
          <TyC class="tyc" />
          <button class="btn btn-dark" style="margin: 20px;" v-on:click="viendoTerminos = false;">Entendido</button>
          </div>
      </div>
    </div>


    <div v-if="viendoPoliticas">
      <div style="position:fixed; background-color:black; height:100vh; width:100vw; top:0px; z-index:10000; opacity:0.5;">


      </div>
      <div style="position:fixed; height:Calc(100vh - 120px); overflow-y: scroll; padding:10px; background:white; top:20px; width:800px; max-width:90%; margin: 0px auto; left: 0; right: 0; opacity:1; z-index:10001;">
          <div class="pdp">
          <PdP class="pdp" />
          <button class="btn btn-dark" style="margin: 20px;" v-on:click="viendoPoliticas = false;">Entendido</button>
          </div>
      </div>
    </div>


  </div>

</template>

<script>
import axios from 'axios'
import TopNavD from '@/components/TopNavDFijo.vue'
import TyC from '@/components/TerminosYCondiciones.vue'
import PdP from '@/components/PoliticasDePrivacidad.vue'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Home',
  components: {
    TyC,
    TopNavD,
    PdP,
  },
  data() {
    return {
      viendoTerminos:false,
      viendoPoliticas:false,
      aceptoTerminos:false,
      loading_transferencia:false,
      loading_transbank:false,
    
    }
  },
  created() {
    if(this.examenes_agregados.length == 0 || this.comuna == -1)
      this.$router.push({ name: 'Home' })
    if(this.inicio == -1 || this.termino == -1 || this.dia == -1 || this.mes == -1 || this.año == -1)
      this.$router.push({ name: 'FechaYHora' })
    //if(this.nombre == '' || this.apellido1 == '' || this.rut == '' || this.email == '' || this.telefono == '')

    for (var i = 0; i<this.orden_final.length; i++){
        if (this.orden_final[i].examenes.length > 0)
        {

          if(!(

          this.orden_final[i].nombre.length > 1 &&
          this.orden_final[i].rut.length>7 && 
          this.orden_final[i].email.length > 2 && 
          this.orden_final[i].apellido1.length > 1 &&
          this.orden_final[i].telefono.length > 6 &&
          this.verificar_correo(this.orden_final[i].email) &&
          this.verificar_rut(this.orden_final[i].rut)
          
          ))
          {
            this.$router.push({ name: 'DatosPersonales' })
            break
          }
          if(this.orden_final[i].email.length != '')
            mails.push(this.orden_final[i].email)
        }
      }
      if (this.direccion.length < 3 || this.examenes_agregados.length == 0 || !(mails.length === new Set(mails).size))
        this.$router.push({ name: 'DatosPersonales' })




  },
  beforeDestroy () {

  },
  methods: {
    ...mapActions(['clickearExamenAction', 'cambiarCantidadAction', 'cambiarCantidadPersonasAction']),

    verificar_correo(c){
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(c != '')
        return re.test(c) ? true: false;
      return true;
    },

    verificar_rut(r)
    {
      function dv(T){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
          S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
      }
    function validaRut (rutCompleto) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
          return false;
        var tmp 	= rutCompleto.split('-');
        var digv	= tmp[1]; 
        var rut 	= tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
          return (dv(rut) == digv ) ? true : false;
      }
      return validaRut(r)
    },

    cambiarCantidadPersonas(tipo){
        if (tipo == "sumar")
          this.cambiarCantidadPersonasAction({cantidad:this.n_personas+1})
        else
          this.cambiarCantidadPersonasAction({cantidad:this.n_personas-1})
        this.$forceUpdate();
    },
  cambiarCantidad(e, tipo){
    if (tipo == "sumar")
      this.cambiarCantidadAction({eid:e.id, cantidad:e.cantidad+1})
    else
      this.cambiarCantidadAction({eid:e.id, cantidad:e.cantidad-1})
    if(this.examenes_agregados.length == 0)
      this.$router.push({ name: 'Home' })
    this.$forceUpdate();
  },
  checkout(){
    if(this.puedeContinuar)      
      this.$router.push({ name: 'MetodosDePago' })

  },
      close(e){
      if (!e.target.classList.contains('tyc') && this.viendoTerminos)
        this.viendoTerminos = false;
      if (!e.target.classList.contains('pdp') && this.viendoPoliticas)
        this.viendoPoliticas = false;
      },
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
      if(this.puedeContinuar && this.aceptoTerminos)
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
        departamento:this.departamento,
        n_depto:this.n_depto,
        orden:this.orden_final,
        /*
        apellido1:this.apellido1,
        apellido2:this.apellido2,
        nombre:this.nombre,
        
        rut:this.rut,
        email:this.email,
        telefono:this.telefono,
       
        n_personas:this.n_personas,
        */
        })
        .then(r=>{
          this.$router.push({ path: '/PagoRealizado/'+r.data.orden_id })
          this.loading_transferencia = false;
        })
        .catch(e=>{
          this.loading_transferencia = false;
        })
        this.$gtag.event('comprobar-agendar', {'event_category': 'agendar', 'event_label': 'correcto', 'value': 1} );
      }
      else{
        this.$gtag.event('comprobar-agendar', {'event_category': 'agendar', 'event_label': 'incorrecto', 'value': 1} );
      }

    }

  },
  watch:{

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
    'costo_servicio', 
    'costo_servicio_pendiente',
    'n_personas',
    'orden_final',

    'direccion',
    'apellido1',
    'nombre',
    'departamento',
    'rut',
    'email',
    'telefono',
    'n_depto', 
    ]),
    loading(){
      return this.loading_transferencia || this.loading_transbank
    },
    puedeContinuar(){
      return this.examenes_agregados.length > 0 && !this.loading && this.direccion.length > 2 && this.puedeContinuarError == ''
    },

    puedeContinuarError(){
      let mails = []
      for (var i = 0; i<this.orden_final.length; i++){
        if (this.orden_final[i].examenes.length > 0)
        {

          if(!(

          this.orden_final[i].nombre.length > 1 &&
          this.orden_final[i].rut.length>7 && 
          this.orden_final[i].email.length > 2 && 
          this.orden_final[i].apellido1.length > 1 &&
          this.orden_final[i].telefono.length > 6 &&
          this.verificar_correo(this.orden_final[i].email) &&
          this.verificar_rut(this.orden_final[i].rut)
          
          ))
          {
            return 'Hay pacientes con información incompleta.'
          }
          if(this.orden_final[i].email.length != '')
            mails.push(this.orden_final[i].email)
        }
      }
      if (this.direccion.length < 3)
        return 'Falta agregar dirección.'
      if (this.examenes_agregados.length == 0)
        return 'Debes agregar al menos un examen.'
      if (!(mails.length === new Set(mails).size))
        return 'No puede haber pacientes con e-mails repetidos.'

      return ''
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
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
.tyc-container{
  margin-top:15px; position:absolute; right:140px; display:block; text-align:right;
}
@media only screen and (max-width: 992px) {
.tyc-container{
  margin-top:15px; 
  display:block; 
  text-align:right;
  position:static;
}
.desktop{
  display:none;
}
}
</style>