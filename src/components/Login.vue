<template>
<div>
  <TopNavD/>
  <div class="home" style="">
    
<img class="wave" src="@/assets/curva.svg">

<div v-if="registrandose == 0">
    <div style="background-color:white;" class="containers">
      <div class="img">
        <img src="@/assets/svg/login.svg">
      </div>
      <div class="login-content">
        <div class="formy">
          <b-icon style="height:60px; width:60px; color:rgb(20, 134, 231);" icon="person" />
          <h2 class="title">¡Bienvenido!</h2>
          <div class="input-div one">
            <div class="i">
              <b-icon icon="person"></b-icon>
            </div>
            <div class="div">
              <h5 v-if="!inputEmail && email == ''">Correo electrónico</h5>
              <input @focus="inputEmail = true" @blur="inputEmail = false" v-model="email" type="text" class="input">
            </div>
          </div>
          <div class="input-div pass">
            <div class="i">
              <b-icon icon="lock"></b-icon>
            </div>
            <div class="div">
              <h5 v-if="!inputPassword && password == ''">Contraseña</h5>
              <input @focus="inputPassword = true" @blur="inputPassword = false" v-model="password" type="password" class="input">
            </div>
          </div>
          <a href="#">¿Olvidaste tu contraseña?</a>
          <button v-on:click="entrar()" class="btn"> Entrar <div v-if="cargando" class="spinner-border text-light spinner-border spinner-border-sm" style="margin: 0 auto; color:white;" role="status"></div>    </button>
           <div style="width:100%; text-align:center;">¿Eres nuevo en ClinicGo? <span v-on:click="registrandose = 1" style="cursor:pointer; display:inline; width:100%; text-align:left; color:rgb(20, 134, 231); font-size:16px;" href="#">Regístrate</span></div>
        </div>
         
      </div>
    </div>
</div>




<div v-else-if="registrandose == 1">
    <div style="background-color:white;" class="containers">
      <div class="img">
        <img src="@/assets/svg/login.svg">
      </div>
      <div class="login-content">
        <div class="formy">
          <div style="position:relative;">

          <b-icon style="height:60px; width:60px; color:rgb(20, 134, 231);" icon="egg" />
          <h2 class="title">Regístrate</h2>
          <p style="text-align:left;">Te enviaremos un correo para verificar tu email y continuar con tu registro.</p>


          <span v-if="!inputEmailR" style="position:absolute; color:red; left:0px;">{{error_crear_correo_electronico}}</span>
          <div style="margin: 30px 0px 40px 0px;" class="input-div one">
            <div class="i">
              <b-icon icon="egg"></b-icon>
            </div>
            <div class="div">
              <h5 v-if="!inputEmailR && email_registrarse == ''">Correo electrónico</h5>
              <input @focus="inputEmailR = true" @blur="inputEmailR = false" v-model="email_registrarse" type="text" class="input">
            </div>
          </div>

          <button v-on:click="crear_cuenta()" class="btn"> 
            Registrarme
            <div v-if="loading" class="spinner-border text-light spinner-border spinner-border-sm" style="margin: 0 auto; color:white;" role="status"></div>            
            </button>
          
           <div style="width:100%; text-align:center;">¿Ya tienes una cuenta? <span v-on:click="registrandose = 0" style="cursor:pointer; display:inline; width:100%; text-align:left; color:rgb(20, 134, 231); font-size:16px;" href="#">Ingresa</span></div>
        </div>
      </div> 
      </div>
    </div>
</div>



<div v-else-if="registrandose == 2">
    <div style="background-color:white; grid-template-columns: 1fr; padding:120px 0px; height:auto;" class="containers">
      <div style="width:100%; vertical-align:center;">
       <h1>¡Muchas Gracias!</h1>
       <br/>
       <img src="@/assets/ga.png" style="height:250px;" alt="">
       <p style="margin-top:20px;">¡Te hemos enviado un correo electrónico para que puedas finalizar tu registro! <router-link style="display:inline; font-size:16px; color:rgb(20, 134, 231);" to="/" >Volver</router-link>.</p>
       </div>
    </div>
</div>

<div v-else-if="registrandose == 3">
    <div style="background-color:white; grid-template-columns: 1fr; padding:120px 0px; height:auto;" class="containers">
      <div style="width:100%; vertical-align:center;">
       <h1>¡Error!</h1>
       <br/>
       <b-icon style="margin-bottom:10px; height:200px; width:200px; color:red;" icon="x-circle"/>
       <p style="margin-top:20px;">¡Ocurrió un error al registrarte!: {{registrarse_error}}  <span v-on:click="registrandose = 0" style="cursor:pointer; display:inline; font-size:16px; color:rgb(20, 134, 231);" >Volver</span>.</p>
       </div>
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

      email:'',
      email_registrarse:'',
      registrarse_error:'',

      password:'',

      inputEmail:false,
      inputEmailR:false,
      inputPassword:false,
      viendoTerminos:false,
      viendoPoliticas:false,
      aceptoTerminos:false,
      loading_transferencia:false,
      loading_transbank:false,


      loading:false,
      cargando:false,

      registrandose:0,
    
    }
  },
  created() {

  },
  beforeDestroy () {
   
  },
  methods: {
...mapActions(['loginUsuario']),
    entrar(){
       this.cargando = true;
       this.loginUsuario({email: this.email, password:this.password})
       .then(resp=>{
         this.cargando = false;
          this.$router.push('/PanelUsuario')

       })
       .catch(err=>{
         this.cargando = false;
         this.error_msg_login = err.response.data

       })
    },
    crear_cuenta(){
      if (this.puedeRegistrar){
        this.loading = true
        this.registrarse_error = ''
        axios.post(window.hostname+'api/usuario/verificar_email',
        {email:this.email_registrarse})
        .then(resp => 
        {
          this.loading = false;
          this.registrandose = 2

        })
        .catch(e=>{
          this.loading = false;          
          this.registrandose = 3;
          this.registrarse_error = e.response.data.message

        })
    }
    }

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
    'nombre',
    'departamento',
    'rut',
    'email',
    'telefono',
    'n_depto', 
    ]),
    puedeRegistrar(){
      return this.email_registrarse != '' && this.error_crear_correo_electronico == '';
    },
  
    error_crear_correo_electronico(){
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(this.email_registrarse != '')
        return re.test(this.email_registrarse) ? '': 'Correo en formato incorrecto.';
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




.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}
.home{
  padding-top:10px;
  padding-bottom:100px;
}
.containers {

  margin-top:Max(Calc(50vh - 350px), 100px);
  width: 1200px;
  margin-left:Calc(50vw - 600px);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  height: 700px;
  /*background-image: url("https://i.postimg.cc/sDG8zyXM/wave.png");*/
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

.img img {
  width: 500px;
}

.formy {
  width: 360px;
}

.login-content img {
  height: 100px;
}

.login-content h2 {
  margin: 15px 0;
  color: #333;
  
  font-size: 2.9rem;
}

.login-content .input-div {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.login-content .input-div.one {
  margin-top: 0;
}

.i {
  color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.i i {
  transition: 0.3s;
}

.input-div > div {
  position: relative;
  height: 45px;
}

.input-div > div > h5 {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  transition: 0.3s;
}

.input-div:before,
.input-div:after {
  content: "";
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #38d39f;
  transition: 0.4s;
}

.input-div:before {
  right: 50%;
}

.input-div:after {
  left: 50%;
}

.input-div.focus:before,
.input-div.focus:after {
  width: 50%;
}

.input-div.focus > div > h5 {
  top: -5px;
  font-size: 15px;
}

.input-div.focus > .i > i {
  color: #38d39f;
}

.input-div > div > input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555;
  font-family: "poppins", sans-serif;
}

.input-div.pass {
  margin-bottom: 4px;
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}

a:hover {
  color: rgb(20, 134, 231);
}

.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, rgb(20, 134, 231), rgb(105, 191, 255), rgb(105, 191, 255));
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}
.btn:hover {
  background-position: right;
}

@media screen and (max-width: 1050px) {
  .containers {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  .formy {
    width: 290px;
  }

  .login-content h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}

@media screen and (max-width: 900px) {
  .containers {
    grid-template-columns: 1fr;
  }

  .img {
    display: none;
  }

  .wave {
    display: none;
  }

  .login-content {
    justify-content: center;
  }
}

@media (max-width: 900px) {
  .containers {
  height: auto;
  padding:40px 0;
  margin-top:60px !important;
  }

}


@media (min-width: 0px) {
.img img {
  width: 285px;
}
.containers {
  width: 100vw;
  margin-left:0;
}
}


@media (min-width: 768px) {
.img img {
  width: 285px;
}
.containers {
  width: 720px;
  margin-left:Calc(50vw - 360px);
}
}


@media (min-width: 992px) {
.img img {
  width: 400px;
}

.containers {
  width: 960px;
  margin-left:Calc(50vw - 480px);
}

}


@media (min-width: 1200px) {
.img img {
  width: 500px;
}
.containers {
  width: 1140px;
  margin-left:Calc(50vw - 570px);
}
}


@media (min-width: 1400px) {
.img img {
  width: 500px;
}
.containers {
  width: 1320px;
  margin-left:Calc(50vw - 660px);
}
}

</style>