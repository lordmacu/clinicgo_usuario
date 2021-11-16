<template>
  <div class="home" style=" min-height:100vh;">
    <TopNavD  />

<div class="spa" style="background-color:rgb(252,252,252);">



    <div class="container" style=" text-align:left; padding-bottom:120px; ">
      
      <h2 style="margin-bottom:30px; padding-top:30px;">Datos de Pacientes</h2>
    <!--  <span class="ribbon"> <b-icon icon="lock"></b-icon> Privado &nbsp; </span>--> 






 <div  >

<div v-for="p, i in pacientes" style="margin-bottom:20px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; background-color:white; ">
        <div v-on:click="examen_buscado = ''; agregando_examen = false;"   v-b-toggle="'accordion-'+(i+1)" 
        style="width:100%; border-bottom:1px solid rgb(214, 214, 214);  padding:15px 15px 15px 30px; background:white;" > 
        <!--

background: rgb(20,134,231);
background: linear-gradient(90deg, rgba(20,134,231,1) 0%, rgba(50,204,255,1) 100%); color:white;
          -->
          
          <b-icon icon="person"></b-icon> 
          
          {{p.nombre != '' ? p.nombre+' '+p.apellido1 : 'Paciente '+(i+1)}}

           
          <span style="float:right; margin-right:10px;">
            <b-icon style="transition:0.2s;" :style="{'transform': p.visible ? 'rotate(180deg)': 'none'}" icon="chevron-down"></b-icon>          
          </span>
         <!-- <span style="color:rgb(20, 134, 231); border:1px solid; border-radius:20px; padding:4px 8px; margin-right:10px;" v-if="!puedeContinuarArray[i]">
            <b-icon icon="exclamation-triangle"></b-icon>   
            Incompleto
            
          </span>-->

        </div>

      <b-collapse v-model="p.visible" v-bind:id="'accordion-'+(i+1)" accordion="my-accordion" class="main-c">


      <div style="border-radius: 0px 0px 5px 5px;">
      <div class="nombre" style="display:inline-block; font-size:13px; padding-right:7px; margin-top:0px; padding-top:0px;">Nombre <input @focus="focused_nombre = true;" @blur="focused_nombre = false" v-model="p.nombre" v-on:input="p.nombre = $event.target.value" placeholder="Maximiliano" class="form-control" type="text" name="" id=""></div>
      <div class="apellido1" style="display:inline-block; font-size:13px; padding:4px; margin-top:0px; padding-top:0px;">Apellido <input @focus="focused_apellido1 = true;" @blur="focused_apellido1 = false" v-model="p.apellido1"  v-on:input="p.apellido1 = $event.target.value"  placeholder="Pérez" class="form-control" type="text" name="" id=""></div>
      <div class="rut" style="display:inline-block; font-size:13px; padding-right:7px; margin-top:0px; padding-top:0px;">Rut <input :class="{'is-invalid':!verificar_rut(p.rut) && p.rut != '' && !focused_rut}" @focus="focused_rut = true;" @blur="focused_rut = false" placeholder="1234567-8" v-on:input="p.rut = $event.target.value" v-model="p.rut" class="form-control" type="text" name="" id=""><span v-if="!verificar_rut(p.rut) && p.rut != '' && !focused_rut" style="color:red; float:right; height:0px;">Formato Incorrecto </span></div>
      <div class="email" style="width:33%; display:inline-block; font-size:13px; padding-right:7px;">Email <input :class="{'is-invalid':!verificar_correo(p.email) && !focused_email}" v-model="p.email" v-on:input="p.email = $event.target.value" @focus="focused_email = true;" @blur="focused_email = false" placeholder="maxpe@gmail.com" class="form-control" type="text" name="" id=""><span v-if="!verificar_correo(p.email) && !focused_email" style="color:red; float:right; height:0px;">Formato Incorrecto </span></div>
      <div class="telefono" style="width:33%; display:inline-block; font-size:13px; padding:4px;">Teléfono <input v-model="p.telefono" @focus="focused_telefono = true;" @blur="focused_telefono = false" v-on:input="p.telefono = $event.target.value"  placeholder="68247212" class="form-control" type="text" name="" id=""></div>

    <div class="examen-paciente-container">
       <div style="width:100%; padding:20px; margin:0 auto; "><h5>Exámenes de {{p.nombre != '' ? p.nombre : 'Paciente '+(i+1)}}</h5> </div> 
      <div style="margin-top:-10px; padding:0px; font-size:14px; position:relative; padding-bottom:40px;">
        <div class="exam-list" v-for="e in p.examenes" style="">
          <b-icon v-on:click="removeExamen(i, e)" style="color: rgb(108, 193, 252); cursor:pointer;" icon="x-circle"></b-icon> {{e.nombre}}

        </div>
        <div v-if="agregando_examen" class="dont-close-exam" style="position:relative; margin-top:10px;">
          <div style="width:Min(100%, 400px); position:relative;">
        <input  v-on:input="examen_buscado = $event.target.value" v-model="examen_buscado" type="text"  class="form-control input-buscar-examen" placeholder="Escribe un examen" >
         <b-icon class="buscar-examen-icon" icon="search"></b-icon>
         </div>
          <div v-if="resultado_fuse_examen.length>0" class="listado-buscando-container dont-close-exam">

    <div v-if="categorias_selected.some(x=>{return x.id == ez.item.categoria_id})" v-on:click="addExamen(i, ez.item)" :style="{'border-bottom': i2+1 != Math.min(10, resultado_fuse_examen.length) ? '1px solid rgb(214,214,214)': 'none'}"  class="listado-buscando dont-close-exam"  v-for="ez, i2 in resultado_fuse_examen.slice(0, 10)">
<b-icon  style="height:18px; width:18px; transform:translate(0px, 1px); color:rgb(108, 193, 252);" :icon="p.examenes.some(x=>{return x.id == ez.item.id}) ? 'check': 'bag-plus'"/>


      {{ez.item.nombre}} 

        <div class="dont-close-exam" style="position:absolute; border:2px solid rgb(20, 134, 231); color:rgb(20, 134, 231); padding:1px; border-radius:10px; right:5px; top:2px;">
          ${{Intl.NumberFormat('de-DE').format(ez.item.precio)}}
        </div>

    </div>
    
  </div>
        </div>

        <div v-on:click="agregando_examen = !agregando_examen; editando_paciente = i" style="cursor:pointer; position:absolute; bottom:20px; left:40px;  margin: 0 auto; transform:translateY(50px); width:60px; height: 60px; border-radius: 40px; background-color:rgb(108, 193, 252); border:1px solid rgb(108, 193, 252);  " >
          <b-icon icon="plus" style="height:60px; width: 60px; transform:translate(-0px,-0px); color:white;"></b-icon>
        </div>

      </div>

    </div>
            <div v-on:click="removerPaciente(i);" class="btn-agregar-examen-inverso" style="width:170px; margin-bottom:0px;" >
           <b-icon icon="trash"></b-icon> Quitar paciente
        </div>
  </div>
  


      </b-collapse>

 </div>
 <div v-on:click="agregarPaciente()" style="width:280px; vertyi" class="btn-agregar-examen-inverso" >
   <!--style="border:1px solid rgb(20, 134, 231); border-radius:10px; padding:10px; color:rgb(20, 134, 231); cursor:pointer; "-->
<b-icon icon="person" style=" height:20px; width:20px; margin-right:5px; margin-left:5px; transform:translate(0px, 2px);"> </b-icon> <b-icon icon="plus" style="position:absolute;  transform:translate(-19px, -1px);"></b-icon> Agregar un nuevo paciente
 </div>
  </div>









<!--

      <div class="nombre" style="display:inline-block; font-size:13px; padding-right:7px;">Nombre <input @focus="focused_nombre = true;" @blur="focused_nombre = false" v-model="nombre" placeholder="Maximiliano" class="form-control" type="text" name="" id=""></div>
      <div class="apellido1" style="display:inline-block; font-size:13px; padding:4px;">Apellido <input @focus="focused_apellido1 = true;" @blur="focused_apellido1 = false" v-model="apellido1"  placeholder="Pérez" class="form-control" type="text" name="" id=""></div>

      <div class="rut" style="display:inline-block; font-size:13px; padding-right:7px;">Rut <input :class="{'is-invalid':error_crear_rut != '' && !focused_rut}" @focus="focused_rut = true;" @blur="focused_rut = false" placeholder="1234567-8" v-model="rut" class="form-control" type="text" name="" id=""><span v-if="error_crear_rut != '' && !focused_rut" style="color:red; position:absolute;">{{error_crear_rut}} </span></div>

      <h5 style="margin-top:30px;">Contacto</h5>

      <div class="email" style="width:33%; display:inline-block; font-size:13px; padding-right:7px;">Email <input :class="{'is-invalid':error_crear_correo_electronico != '' && !focused_email}" v-model="email" @focus="focused_email = true;" @blur="focused_email = false" placeholder="maxpe@gmail.com" class="form-control" type="text" name="" id=""><span v-if="error_crear_correo_electronico != '' && !focused_email" style="color:red; position:absolute;">{{error_crear_correo_electronico}} </span></div>
      <div class="telefono" style="width:33%; display:inline-block; font-size:13px; padding:4px;">Teléfono <input v-model="telefono" @focus="focused_telefono = true;" @blur="focused_telefono = false"  placeholder="68247212" class="form-control" type="text" name="" id=""></div>
--> 
        <div  style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; background-color:white; padding:20px 25px 25px 25px; margin-top:20px;">
      <h5>Dirección</h5>
      <div class="dir1">
      <div style="width:200px; display:inline-block; font-size:13px; padding-right:7px;">Calle y numero <input placeholder="" v-on:input="direccion = $event.target.value" v-model="direccion" @focus="focused_direccion = true;" @blur="focused_direccion = false" class="form-control" type="text" name="" id=""></div>
      <div style="display:inline-block; padding-right:7px;">
        <div style="font-size:13px;">Comuna</div>
      <div style="display:inline-block; width:100%; padding:6px; border-radius:5px; border: 1px solid rgb(220,220, 220); "><span style="opacity:0.6;">{{comunas.filter(x=>{return x.id == comuna})[0].Nombre}}</span></div> 
      </div>
      </div>

            <div class="dir2" style="margin-top:20px;">
              <div style="font-size:13px;">Tipo</div>
              <button style="margin-right:10px; transition:0s;" v-on:click="depto = 0" :class="{'opcionClicked': depto==0, 'opcionNoClicked': depto==1}" class="btn">Casa</button>
              <button style="transition:0s;" v-on:click="depto = 1" :class="{'opcionClicked': depto==1, 'opcionNoClicked': depto==0}" class="btn">Departamento</button>
            </div>
            <div class="dir3" style="margin-top:20px;">
              <div style="max-width:200px;" v-if="depto == 1">
              <div style="font-size:13px;">Número de departamento</div>
              <input placeholder="A32" maxlength="8" v-model="n_depto" @focus="focused_n_depto = true;" @blur="focused_n_depto = false" class="form-control" type="text" name="" id="">
              </div>
            </div>
        </div>
            

      <div style="position:fixed; bottom:60px; left:0px; z-index:9999; width:100%;">
        <div class="container" style="position:relative;">
          <div style="position:absolute; right:0px;" :style="{'opacity': alerta && !puedeContinuar ? '1':'0'}" class="alerta alert alert-danger">
           <b-icon icon="exclamation-triangle"></b-icon> {{puedeContinuarError}}
          </div>
        </div>
      </div>

      <div v-if="window.height >= 400" style="position:fixed; left:0px; height:80px; bottom:0px; width:100vw; background:white; border-top:1px solid rgb(214,214,214); ">
          <div style="">
          <div class="container" style="position:relative">
            <div style="display:inline-block; margin-top:30px; width:100%; padding-left:68px; padding-right:90px; text-align:center;">
                Total orden: <span style="color: rgb(20, 134, 231); font-weight:700; "> ${{Intl.NumberFormat('de-DE').format(examenes_agregados.reduce((x, y)=>{return x+y.precio*y.cantidad}, 0) + costo_servicio+(n_personas*costo_servicio_pendiente))}} </span>
            </div>
          <button @mouseleave="alerta = false" @mouseenter="alerta = true" v-on:click="continuar()" style="font-size:14px;  position:absolute; right:10px; top:25px; padding:7px 4px;" :class="{'btn-danger': !puedeContinuar, 'btn-success':puedeContinuar, 'glow':puedeContinuar}" class="btn">Resumen <b-icon style="transform:translateY(2px);" icon="arrow-right-circle"/></button>
          <router-link :to="{name:'FechaYHora'}" tag="button" style="font-size:14px; position:absolute; left:0px; top:25px; width:70px; padding:7px 0px;" class="btn btn-secondary"><b-icon style="transform:translateY(2px);" icon="arrow-left-circle"/> Volver</router-link>
        </div>
        </div>
      </div>

      <div v-else style=" left:0px; height:80px; bottom:0px; background:white; border-top:1px solid rgb(214,214,214); ">
          <div style="">
          <div  style="position:relative">
            <div style="display:inline-block; margin-top:30px; width:100%; padding-left:68px; padding-right:90px; text-align:center;">
                Total orden: <span style="color: rgb(20, 134, 231); font-weight:700; "> ${{Intl.NumberFormat('de-DE').format(examenes_agregados.reduce((x, y)=>{return x+y.precio*y.cantidad}, 0) + costo_servicio+(n_personas*costo_servicio_pendiente))}} </span>
            </div>
          <button @mouseleave="alerta = false" @mouseenter="alerta = true" v-on:click="continuar()" style="font-size:14px;  position:absolute; right:10px; top:25px; padding:7px 4px;" :class="{'btn-danger': !puedeContinuar, 'btn-success':puedeContinuar, 'glow':puedeContinuar}" class="btn">Resumen <b-icon style="transform:translateY(2px);" icon="arrow-right-circle"/></button>
          <router-link :to="{name:'FechaYHora'}" tag="button" style="font-size:14px; position:absolute; left:0px; top:25px; width:70px; padding:7px 0px;" class="btn btn-secondary"><b-icon style="transform:translateY(2px);" icon="arrow-left-circle"/> Volver</router-link>
        </div>
        </div>
      </div>


    </div>
  </div>
    <div class="bottom-spacer"></div>
  </div>

</template>

<script>
import axios from 'axios'
import TopNavD from '@/components/TopNavDFijo.vue'
import {mapGetters, mapActions} from 'vuex';
import Fuse from 'fuse.js'

export default {
  name: 'Home',
  components: {
    TopNavD,
  },
  data() {
    return {


      window: {
          width: 0,
          height: 0
      },


      direccion:'',
      apellido1:'',
      apellido2:'',
      nombre:'',
      depto:1,
      rut:'',
      email:'',
      telefono:'',
      n_depto:'',
      info_adicional:'',
      alerta:false,

      fexamenes:null,

      agregando_examen:false,

      visible:[true, false, false, false],
      focused_direccion:false,
      focused_apellido1:false,
      focused_apellido2:false,
      focused_nombre:false,
      focused_rut:false,
      focused_email:false,
      focused_telefono:false,
      focused_n_depto:false,
      focused_info_adicional:false,

      pacientes:[],
      resultado_fuse_examen:[],
      examen_buscado:'',
    

      editando_paciente:0,

      np:1,
      
    }
  },
  mounted(){
    this.fexamenes = new Fuse(this.examenes, {  keys: ['nombre', 'keywords']})
    document.addEventListener('click', this.close) 
  },
  beforeDestroy () {
    document.removeEventListener('click',this.close)
  },
  destroyed(){
    window.removeEventListener('resize', this.handleResize);
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    if(this.examenes_agregados.length == 0 || this.comuna == -1)
      this.$router.push({ name: 'Home' })
    if(this.inicio == -1 || this.termino == -1 || this.dia == -1 || this.mes == -1 || this.año == -1 || this.categorias_selected.length == 0)
      this.$router.push({ name: 'FechaYHora' })
    if (this.orden_final.length == 0)
    {
    for(var i = 0; i < this.n_personas; i++)
      {

        this.pacientes.push({nombre:'', visible: i == 0, apellido1:'', email:'', rut:'', telefono:'', examenes:[]})
        for(var j = 0; j < this.examenes_agregados.length; j++)
        {
          if(this.examenes_agregados[j].cantidad > i)
            this.pacientes[i].examenes.push(this.examenes_agregados[j])

        }

      }
    }
    else{

      this.pacientes = this.orden_final


    }
    if (this.$store.getters.direccion != '')
      this.direccion = this.$store.getters.direccion
    if (this.$store.getters.n_depto != '')
      this.n_depto = this.$store.getters.n_depto

    
      
  },
  destroyed() {

  },
  methods: {
    ...mapActions(['clickearExamenAction', 'setOrdenFinalAction', 'setDatosPersonalesAction', 'dpAgregarExamenAction', 'dpQuitarExamenAction', 'setNAction']),

    handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
    },

    close(e){
      if (!(e.target.classList.contains('search-exam-popup') || e.target.classList.contains('dont-close-exam') ) && this.focused_exam)
      {
        this.focused_exam = false;
        this.examen_buscado = ''
      }
    },
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
    removeExamen(pos, ex){

      for(var i = 0; i < this.pacientes[pos].examenes.length; i++){
          if (this.pacientes[pos].examenes[i].id == ex.id){
              this.pacientes[pos].examenes.splice(i, 1)
              break;
          }
      }
      this.dpQuitarExamenAction(ex)
      

    },
    addExamen(pos, ex)
    {
      for (var i = 0; i < this.pacientes[pos].examenes.length; i++)
      {
        if(this.pacientes[pos].examenes[i].id == ex.id)
          return;
      }
      this.examen_buscado = ''
      
      this.pacientes[pos].examenes.push(this.examenes.filter(x=>{return x.id == ex.id})[0])
      this.dpAgregarExamenAction(ex)

    },
    redirectPost(url, data) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = url;
    for (var name in data) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = data[name];
        form.appendChild(input);
    }
    form.submit();
    },
    removerPaciente(i){
      if (this.pacientes.length > 1)
      {

        for(var j = 0; j < this.pacientes[i].examenes.length; j++){
              this.dpQuitarExamenAction(this.pacientes[i].examenes[j])
        }
      
      this.pacientes.splice(i, 1);
      this.setNAction(this.pacientes.length)
      }
    },
    agregarPaciente(){
      this.pacientes.push({nombre:'', apellido1:'', email:'', rut:'', telefono:'', examenes:[]})
      this.setNAction(this.pacientes.length)
    },
    continuar()
    {
      if (this.puedeContinuar)
      {
        /*
        this.setDatosPersonalesAction({
          direccion:this.direccion,
          apellido1:this.apellido1,
          //apellido2:this.apellido2,
          nombre:this.nombre,
          depto:this.depto,
          rut:this.rut,
          email:this.email,
          telefono:this.telefono,
          n_depto:this.n_depto,

        })
        */
        for(var j = 0; j< this.pacientes.length; j++)
        {
          if(this.pacientes[j].examenes.length == 0)
          {
            this.pacientes.splice(j, 1)
            this.setNAction(this.pacientes.length)
          }
        }
        this.setOrdenFinalAction({orden:this.pacientes, direccion:this.direccion, depto:this.depto, n_depto:this.n_depto})
        this.$gtag.event('datospersonales-continuar', {'event_category': 'agendar', 'event_label': 'correcto', 'value': 1} );
        this.$router.push({ name: 'Comprobar' })
      }
      else{
        this.$gtag.event('datospersonales-continuar', {'event_category': 'agendar', 'event_label': 'incorrecto', 'value': 1} );
      }
    },
    
    ir_a_pagar()
    {
      if(this.puedeContinuar)
      {
        axios.post(window.hostname+'api/reservar_sin_identificar',
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
        //apellido2:this.apellido2,
        nombre:this.nombre,
        departamento:this.depto,
        rut:this.rut,
        email:this.email,
        telefono:this.telefono,
        n_depto:this.n_depto, //FALTAAA
        info_adicional:this.info_adicional,
      

        })
        .then(r=>{
          this.redirectPost(r.data.url, {token_ws: r.data.token})
        })
        .catch(e=>{
          console.log(e)  
        })
      }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'orden_final', 'costo_servicio', 'costo_servicio_pendiente','usuario_datos', 'comuna', 'comunas', 'examenes', 'examenes_agregados', 'inicio','termino','dia','mes','año', 'categorias_selected', 'n_personas']),
    /*puedeContinuar(){
      return this.rut.length>7 && this.email.length > 2 && this.apellido1.length > 1 && this.nombre.length > 1 && this.direccion.length > 2 && this.error_crear_rut == '' && this.error_crear_correo_electronico == ''
    },*/
    puedeContinuarArray(){
      let ret = []
       for (var i = 0; i<this.pacientes.length; i++){
        if (this.pacientes[i].examenes.length > 0)
        {
          if(!(

          this.pacientes[i].nombre.length > 1 &&
          this.pacientes[i].rut.length>7 && 
          this.pacientes[i].email.length > 2 && 
          this.pacientes[i].apellido1.length > 1 &&
          this.pacientes[i].telefono.length > 6 &&
          this.verificar_correo(this.pacientes[i].email) &&
          this.verificar_rut(this.pacientes[i].rut)
          
          ))
          {
             ret.push(false)
          }else{
            ret.push(true)
          }
        }
      }
      return ret

    },
    puedeContinuarError(){
      let mails = []
      for (var i = 0; i<this.pacientes.length; i++){
        if (this.pacientes[i].examenes.length > 0)
        {

          if(!(

          this.pacientes[i].nombre.length > 1 &&
          this.pacientes[i].rut.length>7 && 
          this.pacientes[i].email.length > 2 && 
          this.pacientes[i].apellido1.length > 1 &&
          this.pacientes[i].telefono.length > 6 &&
          this.verificar_correo(this.pacientes[i].email) &&
          this.verificar_rut(this.pacientes[i].rut)
          
          ))
          {
            return 'Hay pacientes con información incompleta.'
          }
          if(this.pacientes[i].email.length != '')
            mails.push(this.pacientes[i].email)
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
    puedeContinuar(){
      return this.puedeContinuarError == ''
    },
  

  },
  watch:{

    examen_buscado(val){
      this.resultado_fuse_examen = this.fexamenes.search(val)
      if(!this.focused_exam)
        this.focused_exam = true;
    },

  }
}
</script>
<style scoped>
.dir1, .dir2, .dir3{
  display:inline-block;
  margin-right:40px;
  margin-top:0px !important;
}
.glow {
  color: #fff;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
  animation-iteration-count: 5;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #198754, 0 0 40px #198754, 0 0 50px #198754, 0 0 60px #198754, 0 0 70px #198754;
  }
  to {
    box-shadow: 0 0 20px #fff, 0 0 30px #198754, 0 0 40px #198754 0 0 50px #198754, 0 0 60px #198754, 0 0 70px #198754, 0 0 80px #198754;
  }
}
.spa{
  margin-top:100px;
}
.listado-buscando-container{
  z-index:9997; left:20px; top:35px; width:Min(400px, Calc(100vw - 100px)); position:absolute; background:white; border: 1px solid rgb(108, 193, 252); margin-top:12px; border-radius:20px;padding:15px 0px 10px 0px;
}
.listado-buscando{
   position:relative; cursor:pointer; margin:0 auto; width:100%; text-align:left; padding:5px 10px 5px 10px; 
}
.examen-paciente-container{
border: 1px solid rgb(214, 214, 214); padding-right:40px; border-radius:10px; margin-top:40px; margin-bottom:40px; background:rgba(20, 134, 231, 0.04);
}
.buscar-examen-icon{
  position:absolute; top:10px; right:-5px;
}
.exam-list{
  padding:8px 20px;
}
.input-buscar-examen{
  margin-left:20px; margin-right:20px; border-radius:20x;
}
.btn-agregar-examen{
  border:2px solid rgb(255, 200, 9); 
  border-radius:10px; 
  padding:10px; 
  margin-top:10px; 
  width:200px;
  background:rgb(255, 200, 9);
  color:white; 
  cursor:pointer;
  font-weight: 700;
  margin-bottom:10px;
}
.btn-agregar-examen:hover{
  border:2px solid rgb(255, 200, 9); 
  border-radius:10px; 
  padding:10px; 
  margin-top:10px; 
  width:200px;
  background:white;
  color:rgb(255, 200, 9); 
  cursor:pointer;
  font-weight: 700;
}

.btn-agregar-examen-inverso{

  border:2px solid rgb(108, 193, 252); 
  border-radius:10px; 
  padding:10px; 
  margin-top:10px; 
  width:190px;
  background:white;
  color:rgb(108, 193, 252);
  cursor:pointer;
  font-weight: 700;


}
.btn-agregar-examen-inverso:hover{
  border:2px solid rgb(108, 193, 252);
  border-radius:10px; 
  padding:10px; 
  margin-top:10px; 
  width:200px;
  background:rgb(108, 193, 252);
  color:white; 
  cursor:pointer;
  font-weight: 700;
  margin-bottom:10px;
}
.opcionClicked{
  border:2px solid rgb(108, 193, 252); 
  color:white;
  background: rgb(108, 193, 252);
}
.opcionClicked:hover{
  color:white;

}
.opcionNoClicked{
  border:2px solid rgb(108, 193, 252); 
  color:rgb(108, 193, 252);
}
.opcionNoClicked:hover{
  border:2px solid rgb(108, 193, 252); 
  color:white;
  background: rgb(108, 193, 252);
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
  background: rgb(108, 193, 252);
  color:white;
  padding:1em 0;
  position: absolute;
  top:0;
  right:0;
  transform: translateX(30%) translateY(0%) rotate(45deg);
  z-index: 99;
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
  background: rgb(108, 193, 252);
}
.ribbon:before {
  right:100%;
}
.alerta{
  padding:10px;
  background-color: #dc3545;
  color:white;
  position:absolute;
  
  right:3px;
  font-weight: 700;
  top: -41px;
  font-size: 12px;
  transition-duration: 0.2s;
}
.alerta:after{

  content:'';
  right:30px;
  top:33px;
  width: 10px;
  height: 10px;
  background: #dc3545;
  border-right: 1px solid #dc3545;
  border-bottom: 1px solid #dc3545;
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
.carta{
  overflow: hidden; 
  position:relative; 
  background:white; 
  border:1px solid rgb(220, 220, 220); 
  padding: 40px; 
  border-radius:5px; 
  box-shadow:rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
@media only screen and (max-width: 540px) {
.nombre, .apellido1, .apellido2, .rut, .email, .telefono{
  width: 100% !important;
  margin:0px;
  padding:0px !important;
  display: block !important;;
}
.carta{
  padding: 10px; 
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

.ribbon {
  padding:4px 0;

  transform: translateX(40%) translateY(0%) rotate(45deg);

}




}
.main-c{
  padding:20px 30px;
}
@media only screen and (max-width: 1200px) {
  .top-spacer{
  height:85px;
}
.spa{
  margin-top:55px;

}
.bottom-spacer{
  height:60px;
}




}

@media (max-width: 576px) { 
  
  .main-c{
  padding:20px 10px;
}

.buscar-examen-icon{
  position:absolute; top:10px; right:-5px;
}
.exam-list{
  padding:8px 10px;
}
.input-buscar-examen{
  margin-left:10px; 
  margin-right:10px;
  width:100%;
  border-radius:10x;
}
.examen-paciente-container{
  padding-right:20px;
}
.listado-buscando{
   position:relative; cursor:pointer; margin:0 auto; width:100%; text-align:left; padding:5px 10px 5px 10px; 
}


.listado-buscando-container{
  z-index:9997; left:10px; top:35px; width: Min(400px, Calc(100% + 0px)); position:absolute; background:white; border: 1px solid rgb(108, 193, 252); margin-top:12px; border-radius:20px;padding:15px 0px 10px 0px;
}

}

@media (max-width: 768px) { 
  
 }

@media (max-width: 992px) { 
  .dir1, .dir2, .dir3{
  display:block;
  margin-right:40px;
  margin-top:20px !important;
}
 }

@media (min-width: 1200px) { 
  
 }

@media (min-width: 1400px) { 
  
 }




</style>