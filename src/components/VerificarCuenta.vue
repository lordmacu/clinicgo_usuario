<template>
  <div>
  <div v-if="loaded" class="home" style="">
    <TopNavD  />
<div class="main-cont">


<div class="top-spacer"></div>
<img class="wave" src="@/assets/curva.svg">

  <div v-if="estado == 0 && tipo == 1">
    <div class="container" style=" text-align:left;">

      <div class="carta" style="overflow: hidden; position:relative; background:white; border:1px solid rgb(220, 220, 220); padding: 40px; border-radius:5px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
      <span class="ribbon"> <b-icon icon="lock"></b-icon> Privado &nbsp; </span>
      <h5>Nombre completo</h5>

      <div class="nombre" style="display:inline-block; font-size:13px; padding-right:7px;">Nombre <input @focus="focused_nombre = true;" @blur="focused_nombre = false" v-model="nombre" placeholder="Maximiliano" class="form-control" type="text" name="" ></div>
      <div class="apellido1" style="display:inline-block; font-size:13px; padding:4px;">Apellido <input @focus="focused_apellido1 = true;" @blur="focused_apellido1 = false" v-model="apellido1"  placeholder="Pérez" class="form-control" type="text" name="" ></div>
      <div class="rut" style="display:inline-block; font-size:13px; padding-right:7px;">Rut <input :class="{'is-invalid':error_crear_rut != '' && !focused_rut}" @focus="focused_rut = true;" @blur="focused_rut = false" placeholder="1234567-8" v-model="rut" class="form-control" type="text" name="" ><span v-if="error_crear_rut != '' && !focused_rut" style="color:red; position:absolute;">{{error_crear_rut}} </span></div>

      <h5 style="margin-top:30px;">Contacto</h5>
      <div class="telefono" style="width:33%; display:inline-block; font-size:13px; padding:4px;">Teléfono <input v-model="telefono" @focus="focused_telefono = true;" @blur="focused_telefono = false"  placeholder="68247212" class="form-control" type="text" name="" ></div>
      
        <h5 style="margin-top:30px;">Contraseña</h5>

      <div class="nombre" style="display:inline-block; font-size:13px; padding-right:7px;">
        Contraseña 
        
        <input @focus="focused_contraseña = true;" @blur="focused_contraseña = false" v-model="pass1" class="form-control" type="password" name="" >
        
        </div>
      <div class="apellido1" style="display:inline-block; font-size:13px; padding:4px;">Verificar Contraseña <input @focus="focused_contraseña = true;" @blur="focused_contraseña = false" v-model="pass2"  class="form-control" type="password" name="" ></div>
<div style="color:red; font-size:14px; position:absolute;" v-if="passwordError != '' && !focused_contraseña && pass1 != ''">{{passwordError}}</div>
      <div style="width:100%; text-align:center; margin-top:20px;">
      <button style="width:200px; text-align:left; padding-left:35px;" v-on:click="verificar()" class="btn" :class="{'btn-success':puedeContinuar, 'btn-danger':!puedeContinuar}">
          ¡Crear mi cuenta!
          <div v-if="loading" class="spinner-border text-light spinner-border spinner-border-sm" style="margin: 0 auto; color:white;" role="status"></div>

      </button>
      </div>

      </div>
    </div>
  </div>


<div v-if="estado == 0 && tipo == 2">
    <div  style="text-align:left; max-width:500px; margin: 0 auto;">

      <div class="carta" style="overflow: hidden; position:relative; background:white; border:1px solid rgb(220, 220, 220); padding: 40px; border-radius:5px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
      <span class="ribbon"> <b-icon icon="lock"></b-icon> Privado &nbsp; </span>

        <div style="text-align:center;"><b-icon icon="lock" style="color:rgb(20, 134, 231); height:40px; width:40px;"/></div>
        <h2 style="text-align:center;">Crea tu contraseña</h2>
<div style="text-align:center;"> 
      <div class="nombre" style="display:block; width:100%; max-width:250px; text-align:left; margin: 0 auto; font-size:13px; padding-right:7px;">
        Contraseña 
        
        <input @focus="focused_contraseña = true;" @blur="focused_contraseña = false" v-model="pass1" style="" class="form-control" type="password" name="" >
        
        </div>
      <div class="apellido1" style="display:inline-block; width:100%; max-width:250px; font-size:13px; padding:4px; text-align:left;">Verificar Contraseña <input @focus="focused_contraseña = true;" @blur="focused_contraseña = false" v-model="pass2"  class="form-control" type="password" name="" ></div>
<div style="color:red; font-size:14px; position:absolute;" v-if="passwordError != '' && !focused_contraseña && pass1 != ''">{{passwordError}}</div>
</div>

      <div style="width:100%; text-align:center; margin-top:20px;">
      <button style="width:260px; text-align:left; padding-left:35px;" v-on:click="verificar2()" class="btn" :class="{'btn-success':puedeContinuar2, 'btn-danger':!puedeContinuar2}">
          ¡Guardar mi contraseña!
          <div v-if="loading" class="spinner-border text-light spinner-border spinner-border-sm" style="margin: 0 auto; color:white;" role="status"></div>

      </button>
      </div>

      </div>
    </div>
  </div>
  <div v-else-if="estado == 1">
       <div class="container" style=" text-align:left;">
      <div class="carta" style="text-align:center; overflow: hidden; position:relative; background:white; border:1px solid rgb(220, 220, 220); padding: 40px; border-radius:5px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">


      <div><h2>¡Cuenta creada!</h2></div> 
      <b-icon style="margin-bottom:10px; height:200px; width:200px; color:green;" icon="check-circle"/>
      <div>¡Tu cuenta se creó exitosamente! Ahora puedes  <router-link style="text-decoration:none; color:rgb(20, 134, 231); " :to="{name:'Login'}"> iniciar sesión</router-link>.</div>
      </div>
    </div>
  </div>


  <div v-else-if="estado == 2">
       <div class="container" style=" text-align:left;">
      <div class="carta" style="text-align:center; overflow: hidden; position:relative; background:white; border:1px solid rgb(220, 220, 220); padding: 40px; border-radius:5px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">


      <div><h2>¡Error!</h2></div> 
      <b-icon style="margin-bottom:10px; height:200px; width:200px; color:red;" icon="x-circle"/>
      <div>¡No se pudo comprobar tu correo electrónico! <router-link style="text-decoration:none; color:rgb(20, 134, 231); " :to="{name:'Home'}">Volver</router-link>.</div>
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
    }
  },
  created() {
    axios.post(window.hostname+'api/usuario/verificar_token_email_get_tipo',
        {id:this.$route.params.id,
        tokens:this.$route.params.token})
        .then(r => 
        {

          if(r.data.tipo == 'nuevo')
            this.tipo = 1
          else
            this.tipo = 2
          this.loaded = true;

        })
        .catch(e=>{
          console.log(e.response)

        })

  },
  destroyed() {

  },
  methods: {
    ...mapActions(['clickearExamenAction', 'vaciarCarroAction']),
      verificar(){
      if (this.puedeContinuar){
        this.loading = true;
        this.registrarse_error = ''
        axios.post(window.hostname+'api/usuario/verificar_token_email',
        {id:this.$route.params.id,
        tokens:this.$route.params.token,
        nombre:this.nombre,
        apellido:this.apellido1,
        password:this.pass1,
        rut:this.rut,
        telefono:this.telefono})
        .then(resp => 
        {
          this.estado = 1
          this.loading = false;

        })
        .catch(e=>{          
          this.estado = 2;
          this.loading = false;

        })
    }
    },
      verificar2(){
      if (this.puedeContinuar2){
        this.loading = true;
        this.registrarse_error = ''
        axios.post(window.hostname+'api/usuario/verificar_token_email_2',
        {id:this.$route.params.id,
        tokens:this.$route.params.token,
        password:this.pass1
        })
        .then(resp => 
        {
          this.estado = 1
          this.loading = false;

        })
        .catch(e=>{          
          this.estado = 2;
          this.loading = false;

        })
    }
    },
    

  },
  computed: {
    ...mapGetters(['isLoggedIn','usuario_datos', 'comuna', 'comunas', 'examenes_agregados']),
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
  margin-top:Max(Calc(50vh - 350px), 100px);
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