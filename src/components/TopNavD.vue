<template>
<div style="position:absolute; top:0px; width:100%; z-index:9999;">

   <div  v-if="dropdownMenu" style="font-size: 14px;"  class="dropdown-menu-x">
     <div v-if="!isLoggingOut">
     <div style="text-align:center; width:100%;">
<div class="numberCircle" style="margin: 10px auto;"> <b-icon icon="cart"></b-icon></div>
</div>

<div v-if="examenes_agregados.length > 0">
  <div style="text-align:left; padding:10px;">Has agregado {{examenes_agregados.reduce((x, y) => {return x + y.cantidad },0)}} examenes.</div>

  <div style="padding:0px 0px 0px 10px;">
  <table style="width:100%;">
  <tr>
    <td style="text-align:left; border-bottom:1px solid black; font-weight:700;">Examen</td>
    <td style="border-bottom:1px solid black;font-weight:700;">Precio</td>
  </tr>
    
  <tr v-for="e in examenes_agregados">
    <td style="text-align:left; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">- {{e.cantidad}} x {{e.nombre}}</td>
    <td>${{Intl.NumberFormat('de-DE').format(e.precio*e.cantidad)}}</td>
  </tr>
  </table>

  </div>

<hr />
<div style="padding: 0px 5px 10px 0px; text-align:right">
  <table style="width:100%;">
    <tr>
      <td style="text-aling:right;">Total en exámenes:</td>
      <td>${{Intl.NumberFormat('de-DE').format(examenes_agregados.reduce((x, y)=>{return x+y.precio*y.cantidad}, 0))}}</td>
    </tr>
    <tr>
      <td style="text-aling:right;">Toma de muestra:</td>
      <td>${{Intl.NumberFormat('de-DE').format(costo_servicio+(n_personas*costo_servicio_pendiente))}}</td>
    </tr>
    <tr>
      <td style="text-aling:right; font-weight:700;">Total:</td>
      <td style="font-weight:700;">${{Intl.NumberFormat('de-DE').format(examenes_agregados.reduce((x, y)=>{return x+y.precio*y.cantidad}, 0) + costo_servicio+(n_personas*costo_servicio_pendiente))}}</td>
    </tr>
  </table>
  <div style="padding: 0px 10px; position:relative;">
    <div v-if="btnhover && !(comuna != -1 && examenes_agregados.length > 0)" class="alertaa">
        ¡Debes agregar al menos una comuna y examen!
    </div>
  <button  v-on:click="checkout();" class="agendar-btn" @mouseenter="btnhover = true" @mouseleave="btnhover = false" style="width:100%; color:white;" :style="{'background': comuna != -1 && examenes_agregados.length > 0 ? 'rgb(255, 200, 9)':'rgb(253,227,140)'}">Ir a agendar <b-icon style="transform:translate(0px, 2px);" icon="arrow-right-circle"/></button>
  </div>
</div>
</div>
<div v-else style="padding-bottom:40px; padding-top:20px; font-style: italic;">
 ¡Tu carro de compras esta vacío!
</div>
<!--<p class="linky" v-on:click="sendLogOut">Salir</p>-->
<!--
<hr />
<p style="font-size:13px;">Sobre Clinic Go | Más información</p>
  -->
  </div>
  <div v-else style="min-height:445px;">
    <div class="loader-wrapper">
      <p style="color:rgba(17,17,17,0.7); margin-bottom:30px;">
        Cerrando sesión...
      </p>
      <div class="loader"></div>
    </div>
  </div>

   </div>

<div class="topnav"  v-bind:class="[isSticky ? stickyClass : '']">

 
  <div v-if="isSticky" class="desktop" style="height:100px; ">
    

  <div class="logo"> <router-link  style="cursor:pointer;" tag="div" :to="{name:'Home'}" ><img src="@/assets/logo3.png" style="max-height:60px; transform:translate(10px,0px);" alt="Imagen"> <!--<span style="color:#818181; font-size:30px;">--></router-link></div>
  <div style='float:right; margin-right:40px; '>

<b-icon  v-on:click="dropdownMenu = !dropdownMenu" icon="cart" style="cursor:pointer; color:rgb(20,20,20); height:35px; width:35px; position:absolute; top:33px; right:185px;" />
<div v-if="examenes_agregados.length>0" style="position:absolute; top:28px; right:177px; color:white; background:rgb(108, 193, 252); width:20px; height:20px; font-size:14px; border-radius:10px;">{{examenes_agregados.reduce((x, y) => {return x + y.cantidad },0)}}</div>
 <router-link v-if="!isLoggedIn" tag="a" class="loginbtn"  to="/login" style="color: rgb(20,20,20);" href="">
   <i class="fa fa-user" style="font-size:20px;  margin-right:5px;" aria-hidden="true">   </i> Entrar </router-link>
   <router-link tag="div" to="/PanelUsuario" style="cursor:pointer; margin-top:30px; outline:none; margin-right:20px; color:black;"  class="loginbtn" v-if="isLoggedIn"><i class="fa fa-user" style="font-size:16px;  margin-right:5px;" aria-hidden="true"/>{{usuario_datos.nombre}}</router-link>
   </div>

   </div>
  <div v-if="!isSticky" class="desktop" style="height:100px;">
    
  <div v-if="!isSticky" class="logo"> <router-link  style="cursor:pointer;" tag="div" :to="{name:'Home'}" ><img  src="@/assets/logo5.png" style="max-height:60px; transform:translate(10px,0px);" alt="Imagen"><!--<span style="color:white; font-size:30px;"> Clinic Match</span>--></router-link></div>
  <div v-else class="logo"> <router-link  style="cursor:pointer;" tag="div" :to="{name:'Home'}" ><img src="@/assets/logo3.png" style="max-height:80px; transform:translate(10px,-5px);" alt="Imagen"><span style="color:#818181; font-size:30px;"> Clinic Match</span></router-link></div>
  <div style='float:right; margin-right:40px;'>


<b-icon  v-on:click="dropdownMenu = !dropdownMenu" icon="cart" style="cursor:pointer; color:white; height:35px; width:35px; position:absolute; top:33px; right:185px;" />
<div v-if="examenes_agregados.length>0" style="position:absolute; top:27px; right:177px; color:white; background:rgb(108, 193, 252); width:20px; height:20px; font-size:14px; border-radius:10px;">{{examenes_agregados.reduce((x, y) => {return x + y.cantidad },0)}}</div>
<router-link v-if="!isLoggedIn" tag="a" to="/login" style="color:white;" class="loginbtn" href="">

   <i class="fa fa-user" style="font-size:20px;  margin-right:5px;" aria-hidden="true">   </i> Entrar </router-link>
   <router-link tag="div" to="/PanelUsuario" style="cursor:pointer; margin-top:30px; outline:none; margin-right:20px; color:white;"  class="loginbtn" v-if="isLoggedIn"><i class="fa fa-user" style="font-size:16px;  margin-right:5px;" aria-hidden="true"/>{{usuario_datos.nombre}}</router-link>

   
   </div>
   </div>

  

</div>

  
  <div class="mobile"  >


  <div class="logo"><img src="@/assets/logo5.png" style="max-height:35px; transform:translate(20px, -9px);" alt="Imagen"><!--<span style="color:white; font-size:20px;"> Clinic Match</span>--></div>
  <div style='margin-right:30px;'>
    <div class="entrarbtn" style="position:absolute; right:20px; top: 8px;">
      
<!--carrito -->
<div style="display:inline-block; position:relative; margin-right:14px;">
<b-icon  v-on:click="dropdownMenu = !dropdownMenu" icon="cart" style="cursor:pointer; color:white; height:30px; width:30px; transform:translate(0px,4px); display:inline-block;" />
<div v-if="examenes_agregados.length>0" style="position:absolute; top:3px; right:-5px; color:white; background:rgb(108, 193, 252); width:12px; height:12px; font-size:9px; border-radius:10px;">{{examenes_agregados.reduce((x, y) => {return x + y.cantidad },0)}}</div>
</div>

<router-link v-if="!isLoggedIn" tag="a" to="/login" class="loginbtn" href="">
   <i class="fa fa-user" style="font-size:15px;  margin-right:5px;" aria-hidden="true"/>
    Entrar    
</router-link>

   <router-link tag="div" to="/PanelUsuario" style="outline:none; cursor:pointer;  padding:0px; margin-right:20px; color:white; display:inline-block; transform:translate(0px, 0px);"   v-if="isLoggedIn"><i class="fa fa-user" style="font-size:16px;  margin-right:5px;" aria-hidden="true"/>  {{usuario_datos.nombre}}</router-link>
   
   </div>
  </div>
 </div>

     <div v-if="isSticky" v-bind:class="[isSticky ? stickyClass : '']" class="mobile"  >


  <div class="logo"><img  src="@/assets/logo3.png" style="max-height:35px; transform:translate(20px,-9px);" alt="Imagen"><!--<span style="color:white; font-size:20px;"> Clinic Match</span>--></div>
  <div style='margin-right:30px;'>
     <div class="entrarbtn" style="position:absolute; right:20px; top: 8px;">
      
<!--carrito -->
<div style="display:inline-block; position:relative; margin-right:14px;">
<b-icon  v-on:click="dropdownMenu = !dropdownMenu" icon="cart" style="cursor:pointer; color:black; height:30px; width:30px; transform:translate(0px,4px); display:inline-block;" />
<div v-if="examenes_agregados.length>0" style="position:absolute; top:3px; right:-5px; color:white; background:rgb(108, 193, 252); width:12px; height:12px; font-size:9px; border-radius:10px;">{{examenes_agregados.reduce((x, y) => {return x + y.cantidad },0)}}</div>
</div>

<router-link v-if="!isLoggedIn" tag="a" to="/login" class="loginbtn" style="color:black;" href="">
   <i class="fa fa-user" style="font-size:15px;  margin-right:5px;" aria-hidden="true"/>
    Entrar    
</router-link>

   <router-link tag="div" to="/PanelUsuario" style="outline:none; cursor:pointer;  padding:0px; margin-right:20px; color:black; display:inline-block; transform:translate(0px, 0px);"   v-if="isLoggedIn"><i class="fa fa-user" style="font-size:16px;  margin-right:5px;" aria-hidden="true"/>  {{usuario_datos.nombre}}</router-link>
   
   </div>

    <!--<i v-on:click="openNav()" class="fa fa-bars" style="font-size:40px; transform:translate(0px,-8px); margin-top:20px; color:#818181; float:right;" aria-hidden="true"></i>-->
   </div>
   </div>

   

 <div style="font-size:0px; height:0px;"> &#8205; </div> 
   </div>

  
</template>

<script>

import {mapGetters, mapActions} from 'vuex';


  

export default {
  name: 'TopNavD',
  components: {

},
  data(){

    return{

    window: {
      width: 0,
      height: 0
    },
    navOpened: false,
    scrollPosition:0,
    isSticky: false,
    dropdownMenu:false,
    stickyClass: 'is_sticky',
    currentAnchor: '',
    isLoggingOut: false,
    btnhover:false,
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);

  },
  created () {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    this.handleResize();

  },

  methods: {
    ...mapActions(['logoutUsuarioPaciente']),

  checkout(){
    if(this.comuna != -1 && this.examenes_agregados.length>0)
      this.$router.push({ name: 'FechaYHora' })
  },
    sendLogOut(){
      this.isLoggingOut = true;
      setTimeout(()=>{this.isLoggingOut = false; this.logoutUsuarioPaciente()}, 1500)
    },
    toggleDropdown (e) {
      this.dropdownMenu = !this.dropdownMenu
    },
    close (e) {
      if (!this.$el.contains(e.target)) { /*Si clickeo (e.target) fuera de este componente (this.$el), se cierra*/
        if (!(e.target.classList.contains('linky')))
          this.dropdownMenu = false

      }
    },
    openNav() {
      document.getElementById("mySidenav").style.width = "87%";
      //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    },
      closeNav() {
      document.getElementById("mySidenav").style.width = "0";
       //document.body.style.backgroundColor = "white";
    },
    handleScroll(event){
      this.scrollPosition = window.scrollY
      if(this.$router.currentRoute.name !='BuscadorSolo'){
        if(this.scrollPosition>=1){
            this.isSticky=true
        }else{
            this.isSticky=false
        }
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },


  

  },
   computed: {
    ...mapGetters([
    'isLoggedIn',
    'usuario_datos', 
    'examenes_agregados', 
    'comuna',
    'costo_servicio', 
    'costo_servicio_pendiente',
    'n_personas',
    ])

  },
  watch: {
    
    scrollPosition(){

      /*
      var comofunciona = document.getElementById("comofunciona");
      var nosotros = document.getElementById("nosotros");
      var contacto = document.getElementById("contacto");
      var offset = 5;

      if (this.scrollPosition >= contacto.offsetTop-offset)
      {
        this.currentAnchor = 'contacto'
      }
      else if (this.scrollPosition >= nosotros.offsetTop-offset && this.scrollPosition < contacto.offsetTop-offset)
      {
        this.currentAnchor = 'nosotros'
      }
      else if (this.scrollPosition >= comofunciona.offsetTop-offset && this.scrollPosition < nosotros.offsetTop-offset)
      {
        this.currentAnchor = 'comofunciona'
      }
      else
      {
        this.currentAnchor = 'inicio'
      }
    */
    }
  },
  mounted() {
    document.addEventListener('click', this.close)    
  },
  beforeDestroy () {
    document.removeEventListener('click',this.close)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css);
.loader-wrapper{
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #00B4CC; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 0.75s linear infinite;
  margin: auto;  
}

.linky{
  color:#00B4CC;
  cursor: pointer;
}
.linky:hover{
  text-decoration: underline;
}
.numberCircle {
    border-radius: 50%;
    width: 66px;
    height: 66px;
    padding: 8px;

    background: rgb(20, 134, 231);
    border: 2px solid #fff;
    color: #fff;
    text-align: center;

    font-size: 32px;
}

.dropdown-menu-x{
  position:fixed;
   height:auto;
   width:270px;
   max-width:90%;
   right:60px;
   top:90px;
   z-index: 9999;
   background: white;
   border-radius: 5px;
   border: solid 1px rgba(0,0,0,0.2);
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.dropdown-menu-x:after {
  content: "";
  position: absolute;
  height:15px;
  width:15px;
  background: white;
  border-left: 1px solid rgba(0,0,0,0.2);
  border-top: 1px solid rgba(0,0,0,0.2);
  transform: rotate(45deg);
  top: -8px;
  left:124px;
  z-index: -1000;
}

.stickycolor{
  color:#818181 !important;
  margin-right:10px !important;
  margin-left:10px !important;
  margin-top:25px !important;
}
.stickycolor:hover{
  border-bottom: none !important;
}
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1000000;
  top: 0;
  right: 0;
  /*background-color: #f1f1f1;*/
  background-color:white;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}
.loginbtn:hover {
  padding: 5px 16px 5px 12px !important; 
  border-radius:15px;
  /*background: white !important;*/

}
.loginbtn {
  text-decoration: none;
  padding: 5px 16px 5px 12px !important; 
  border-radius:15px;
  font-size: 20px;
  color:white;

}
.entrarbtn a:hover{
  text-decoration: none;

}

.sidenav a:hover {
  color: #00B4CC;
}
.redbtn{
  /*
  color: #FF4136 !important;
  border: solid 2px #FF4136;
  */
  border: solid 2px white;
  padding:6px !important;
  cursor: pointer;
  transform:translate(0px, -4px)
  
}
.redbtn:hover{
  /*
  color: #FF4136 !important;
  border: solid 2px #FF4136;
  */
  border: solid 2px white;
  padding:6px !important;
  cursor: pointer;
  transform:translate(0px, -4px)
  
}
.sidenav .closebtn {
  position: absolute;
  top: 5px;
  right: 30px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}




.topnav {

  overflow: hidden;
}
/*
.topnav:hover {
  background: white;

    transition: 0.3s;
}
*/


/* Style the links inside the navigation bar */
.logo{
  margin-left:80px;
  margin-top:20px;
  float:left;
}
.topnav a {
  float: left;
  color: #00B4CC;
  text-align: center;
  margin-top:30px;
  padding: 5px 0px;
  margin-right:20px;
  margin-left:20px;
  text-decoration: none;
  font-size: 20px;
}
.is_sticky{
  background:white;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
    width: 100%;
    -webkit-animation: .95s ease-in-out 0s normal none 1 running fadeInDown;
    animation: .95s ease-in-out 0s normal none 1 running fadeInDown;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
}


.topnav a:hover {
  
  /*border-bottom: 2px solid #00B4CC;*/
}


.topnav a.active {

  color: white;
  border-bottom: 3px solid white;
}
@media only screen and (max-width: 1200px) {
  .loginbtn{
    font-size:16px !important;
  }

.logo{
  margin-left:0px;
  margin-top:20px;
  float:left;
}
.dropdown-menu-x{
  position:fixed;
   height:auto;
   width:270px;
   max-width:90%;
   right:10px;
   top:55px;
   z-index: 9999;
   background: white;
   border-radius: 5px;
   border: solid 1px rgba(0,0,0,0.2);
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.dropdown-menu-x:after {
  content: "";
  position: absolute;
  height:15px;
  width:15px;
  background: white;
  border-left: 1px solid rgba(0,0,0,0.2);
  border-top: 1px solid rgba(0,0,0,0.2);
  transform: rotate(45deg);
  top: -8px;
  left:138px;
  z-index: -1000;
}
.desktop{

  display:none;
  visibility: hidden;
}

}
@media only screen and (min-width: 1201px) {
.mobile{
  display:none;
  max-height:100px;
}
}
.alertaa{
  position:absolute;
  right:5px;
  top:-79px;
  padding:10px;
  background:rgb(20, 134, 231);
  color:white;
  z-index:10001; 
  height:68px; 
  width:220px; 
  border-radius:10px; 
  border:2px solid rgb(15, 100, 200);
  font-weight: 700;
  outline:none; 
}
.alertaa:before{
  content:'';
  position:absolute;
  top:59px;
  transform: rotate(-135deg);
  right:14px;
  height:12px;
  width:12px;
  background: rgb(20, 134, 231);
  border-top: 2px solid rgb(15, 100, 200);
  border-left: 2px solid rgb(15, 100, 200);

  
}

.agendar-btn{


  border-radius:5px; 
  padding:10px;
  font-size: 16px;
  color:white; 
  outline:none; 
  border:none; 
  transition: width 0.1s linear .1s, background-color 0.1s linear 0.1s;  
}

</style>
