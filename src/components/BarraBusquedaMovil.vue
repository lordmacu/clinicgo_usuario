<template>

    <div class="main-search">
      
      <div @mouseenter="hovering_exam = true" @mouseleave="hovering_exam = false" v-on:click="focusInputExam()" :style="{'width': focused_exam || focused_prev || focused_comuna ? '50%':'50%', '-webkit-box-shadow': focused_exam ? '2px 3px 7px -1px rgba(0,0,0,0.31)': 'none', 'background':focused_exam ? 'white': ''}" class="main-search-exam dont-close-exam">
        <div  style="width:100%;">
        <div  style="position:relative;" class="main-search-title dont-close-exam">Examen  <span style="position:absolute; border:1px solid rgb(0,55,60); color: rgb(0,55,60); padding:0px 1px; border-radius:10px; border-radius:10px; font-size:10px; width:auto; left: 47px;" v-if="examenes_agregados.length > 0"> {{examenes_agregados.length}} Agregados <b-icon icon="check"/></span></div>
        <input style="width:100%; font-size:16px;" class="dont-close-exam data-hj-allow" v-on:keyup.enter="onEnterExamen()" v-on:input="examen_buscado = $event.target.value" v-model="examen_buscado" :style="{'background':focused_exam ? 'white': ''}" ref="examen"  @focus="focusInputExam(); examen_buscado = ''" type="text" :placeholder="selected_examen == 0 ? '¿Qué examen?': examenes.filter(x=>{return x.id == selected_examen})[0].Nombre">
        </div>

      </div>




      <div @mouseenter="hovering_comuna = true" @mouseleave="hovering_comuna = false" v-on:click="focusInputComuna($event)" :style="{'width': focused_exam || focused_prev || focused_comuna ? 'Calc(50% - 5px)':'Calc(50% - 5px)','-webkit-box-shadow': focused_comuna ? '2px 3px 15px -1px rgba(0,0,0,0.31)': 'none', 'background':focused_comuna ? 'white': ''}" class="main-search-comuna">
        
        <div style="position:relative;" class="main-search-title">Comuna <span style="position:absolute; border:1px solid rgb(0,55,60); color: rgb(0,55,60); padding:0px 4px; border-radius:10px;   font-size:10px; left: 55px;" v-if="comuna != -1"> <!-- <b-icon icon="check"/>  {{comunas.filter(x=>{return x.id==comuna})[0].Nombre}}--> <b-icon icon="check"/></span> </div>
        <input  style="z-index:-1; font-size:16px;" class="dont-close-comuna data-hj-allow" v-on:keyup.enter="onEnterComuna()" v-on:input="comuna_buscado= $event.target.value" v-model="comuna_buscado" :style="{'background':focused_comuna ? 'white': ''}" ref="comuna" @focus="focusInputComuna(); comuna_buscado = ''" type="text" :placeholder="comuna == -1 ? '¿Qué comuna?': comunas.filter(x=>{return x.id==comuna})[0].Nombre">
        <button @mouseleave="alerta = false" @mouseenter="alerta = true"   class="search-btn dont-close-btn dont-close-exam dont-close-prev dont-close-comuna" v-on:click="checkout(); $gtag.event('barrabusqueda-mandar', {'event_category': 'busqueda', 'event_label': 'buscar', 'value': 1} );"
        :style="{'width': focused_exam || focused_prev || focused_comuna ? '50px':'50px',

                 'background': comuna != -1 && examenes_agregados.length > 0 ? 'rgb(255, 200, 9)':'rgb(253,227,140)'}"
                 :class="{'glow': comuna != -1 && examenes_agregados.length > 0}"
                 >
                 <!--'#3D9970':'#FF4136' 
                 :class="{'glow': comuna != -1 && examenes_agregados.length > 0}"
                 -->
                 <b-icon  class="dont-close-btn dont-close-exam dont-close-prev dont-close-comuna" style="position:absolute; left:8px; top:8px; height:35px; width:35px;" icon="arrow-right-circle"/>
                 
                <!-- <span style="font-size:20px; font-weight:700; display:inline-block; padding-left:14px;">Ir</span>
                -->

                 <!--<span :style="{'opacity': comuna != -1 && examenes_agregados.length > 0 ? '1':'0.5'}" style="transition: 0.3s; font-size:22px; transform:translate(6px,0px); display:inline-block;">&#x1F5D3;</span>
                 -->
                 <div class="dont-close-btn dont-close-exam dont-close-prev dont-close-comuna" :style="{'color': focused_exam || focused_prev || focused_comuna ? 'rgba(255,255,255,1)':'rgba(255,255,255,0)'}" style="margin-left:20px; display:inline; transition-delay:0.3s;"></div>
        </button>

      </div>
    <div v-if="focused_exam"  style=" ertical-align:middle;" class="search-exam-popup dont-close-exam">
      <div v-if="resultado_fuse_examen.length == 0" style="line-height:40px; vertical-align:middle;" class="dont-close-exam">
     <b-icon icon="search" style="height:40px; width:80px; padding-left:20px; padding-right:20px;" /> <div class="dont-close-exam" style="height:60px; margin-left;30px; display:inline-block; vertical-align:middle; font-size:15px;">Escribe los examenes que buscas</div>
     </div>
     <div class="dont-close-exam" v-else>
              <div class="alert alert-info" style="background-color:rgb(20, 134, 231, 0.2) !important; position:absolute; top:10px; font-style: italic; margin-left:10px; font-size:12px; padding:2px; margin-right:10px; margin-bottom:0px; width:Calc(100% - 20px);">
         ** Haz <strong> click en un examen </strong>para agregarlo. <img style="height:20px; width:20px; transform:rotate(-55deg);" src="@/assets/icon/tap.svg" alt="">
         </div>
       <ul style="padding-top:18px;">
         <li class="dont-close-exam" style="height:42px; position:relative;" v-on:click="onClickExam(l.item); $gtag.event('barrabusqueda-examen', {'event_category': 'busqueda', 'event_label': l.item.nombre, 'value': 1} );" v-for="l in resultado_fuse_examen.slice(0, 10)" >
          <!--
           <div :style="{'color': tipo_color[tipos.filter(x=>{return x.id == l.item.tipo_id})[0].id-1], 'border': '2px solid '+tipo_color[tipos.filter(x=>{return x.id == l.item.tipo_id})[0].id-1] }" style="text-align:center; border-radius: 10px; padding:2px; display:inline-block; margin-left:10px; width:110px;">
             {{tipos.filter(x=>{return x.id == l.item.tipo_id})[0].Nombre}}
             </div>
           -->
           <div style="display:inline-block; margin-left:10px; width:20px;"> 
             <b-icon style="height:18px; width:18px; transform:translateY(-5px); color:rgb(20, 134, 231)" v-if="!examenes_agregados.some(e => e.id == l.item.id)" icon="bag-plus"/> 
               <b-icon style="height:18px; width:18px; transform:translateY(-5px); color:rgb(20, 134, 231, 1);" v-else icon="check"/>
             </div>
           <div style="display:inline-block; text-overflow: ellipsis; overflow: hidden; max-width:Calc(100% - 105px);  white-space: nowrap;">{{l.item.nombre}}</div>
           <div class="dont-close-exam" style="position:absolute; border:2px solid rgb(20, 134, 231); color:rgb(20, 134, 231); padding:4px; border-radius:10px; right:5px; top:8px;">
          ${{Intl.NumberFormat('de-DE').format(l.item.precio)}}
           </div>
           <!--
          <div class="dont-close-exam" v-if="examenes_agregados.some(e => e.id == l.item.id)" style="display:inline-block; transform:translate(2px, -5px); border:2px solid #3D9970; color:#3D9970; padding: 4px 4px 4px 4px; border-radius:10px;">
            ¡Agregado!
          </div>
          -->
         </li>
       </ul>

     </div>
    </div>



    <div v-if="focused_prev"  style=" ertical-align:middle;" class="search-prev-popup dont-close-prev">
      <div class="dont-close-prev" v-if="resultado_fuse_insti.length == 0" style="line-height:40px; vertical-align:middle;">
     <b-icon icon="search" style="height:40px; width:80px; padding-left:20px; padding-right:20px;" /> <div class="dont-close-prev" style="height:60px; margin-left;40px; display:inline-block; vertical-align:middle;">Escribe para buscar tu previsión</div>
      </div>
     <div v-else>
       <ul>
         <li v-on:click="onClickInsti(l.item)" v-for="l in resultado_fuse_insti.slice(0, 10)">
           <div style="vertical-align:middle;">
          <div style="display:inline-block; width:50px; padding-top:15px;"> <b-icon icon="file-medical"  style="height:40px; width:40px;" /></div> 
           <div style="display:inline-block; height:40px; vertical-align:middle;">{{l.item.nombre}}</div>
           </div>
         </li>
       </ul>

     </div>
    </div>




    <div v-if="focused_comuna"  style=" ertical-align:middle;" class="search-comuna-popup">
      <div v-if="resultado_fuse_comuna.length == 0 && comuna_buscado == ''" style="line-height:20px; vertical-align:middle;">
     <b-icon icon="search" style="height:40px; width:80px; padding-left:20px; padding-right:20px;" /> <div class="dont-close-comuna" style="height:60px; margin-left;40px; display:inline-block; vertical-align:middle;">Escribe para buscar tu comuna</div>
      <div v-on:click="getMyComuna()" class="location-button dont-close-comuna">
        <b-icon v-if="gettingComuna != 1" icon="cursor"  style="height:20px; width:40px;" /> 
        <div v-if="gettingComuna == 1" class="spinner-border spinner-border spinner-border-sm" style="margin-left:10px; margin-right:14px; margin-top:2px; margin-bottom:2px; color:grey;" role="status"></div>
           <span class="dont-close-comuna" v-if="gettingComuna == 0">Agregar comuna cercanas </span>
           <span class="dont-close-comuna" v-else-if="gettingComuna == 1"> Buscando comunas...</span>
           <span class="dont-close-comuna" v-else-if="gettingComuna == 2"> ¡Comuna agregada!</span>
           <span class="dont-close-comuna" v-else> ¡No se encontraron comunas!</span>

        </div>
      </div>
      <div v-else-if="resultado_fuse_comuna.length == 0 && comuna_buscado != ''" >
          <div style="padding-left:20px;" class="dont-close-comuna" >
            <b-icon icon="x-circle" style="height:40px;width:40px; display:inline-block;" /> <div style="transform:translate(5px,-12px); display:inline-block;">No encontramos comunas.</div>
          </div>
      </div>
     <div v-else>
               <div class="alert alert-info" style="background-color:rgb(20, 134, 231, 0.2) !important; position:absolute; top:10px; font-style: italic; margin-left:10px; font-size:12px; padding:2px; margin-right:10px; margin-bottom:0px; width:Calc(100% - 20px);">
         Haz<strong> click </strong> para seleccionar.<img style="height:20px; width:20px; transform:rotate(-55deg);" src="@/assets/icon/tap.svg" alt="">
         </div>
       <ul style="padding-top:18px;">
    
         <li v-on:click="onClickComuna(l.item); $gtag.event('barrabusqueda-comuna', {'event_category': 'busqueda', 'event_label': l.item.Nombre, 'value': 1} );" v-for="l in resultado_fuse_comuna.slice(0, 10)" >
           <div class="dont-close-comuna" >
          <div class="dont-close-comuna" style="display:inline-block; padding-left:10px; padding-top:10px; height:40px; width:30px; vertical-align:middle;"> <b-icon icon="cursor"  style="height:15px; width:15px;" /></div> 
           <div class="dont-close-comuna"  style="display:inline-block; height:40px; padding-top:10px; vertical-align:middle;">{{l.item.Nombre}} <b-icon v-if="selected_comunas.includes(l.item.id)" style="color:green;" icon="check" /> </div>
           <div class="dont-close-comuna"  style="position:absolute;  padding:4px; border: 1px solid rgb(20, 134, 231); color:rgb(20, 134, 231); border-radius: 10px; right:10px; margin-top:-35px;">{{regiones.filter(x=>{return x.id == l.item.region_id})[0].Nombre}}</div>
           </div>
         </li>
       </ul>

     </div>

    </div>
    <div v-if="alerta && !(comuna != -1 && examenes_agregados.length > 0)" class="alertaa">
        ¡Debes agregar al menos una comuna y examen!
    </div>
<!--
    <div v-if="(comuna != -1 && examenes_agregados.length > 0)" class="alertaa2">
        ¡Ya estás listo para agendar! <img style="height:30px; width:30px; transform:rotate(-55deg);" src="@/assets/icon/tap2.svg" alt="">
    </div>
    -->
    <div class="tags-container">
      <span style="margin-right:4px;">Popular:</span>

      <div v-on:click="agregarExamenAction(examenes.filter(x=>{return x.id == 242})[0])" class="tag">PCR</div>      
      <div v-on:click="agregarExamenAction(examenes.filter(x=>{return x.id == 22})[0])" class="tag">Hemograma</div>
      <div v-on:click="agregarExamenAction(examenes.filter(x=>{return x.id == 243})[0])" class="tag">PCR Express</div>
   
      <!--
      <div v-on:click="agregarExamenAction(examenes.filter(x=>{return x.id == 236})[0])" class="tag">Perfil Lipídico</div>
   -->
    </div>
    </div>


</template>

<script>

import {mapGetters, mapActions} from 'vuex';
import axios from 'axios'
import Fuse from 'fuse.js'
//import "bootstrap-icons/font/bootstrap-icons.css";

export default {
  name: 'VerPrestador',
  components: {
},
  data(){

    return{

        alerta:false,

        tipo_color:['#FF0000','#FFA500','#008000','#FFDC00','#800080','#00FFFF'],

        focused_exam:false,
        hovering_exam:false,
        
        focused_prev:false,
        hovering_prev:false,

        focused_comuna:false,
        hovering_comuna:false,

        examen_buscado:'',
        prevision_buscado:'',
        comuna_buscado:'',

        resultado_fuse_examen:[],
        fexamenes:null,

        resultado_fuse_insti:[],
        fInstituciones:null,

        resultado_fuse_comuna:[],
        fComunas:null,

        selected_comunas:[],
        selected_prevision:0,
        selected_examen:0,
        gettingComuna:0,

    }
  },
  destroyed() {

  },
  created () {
    

  },
  mounted(){
  
    this.fexamenes = new Fuse(this.examenes, {  keys: ['nombre', 'keywords']})
    this.fInstituciones = new Fuse(this.instituciones, {  keys: ['nombre', 'keywords']})
    this.fComunas = new Fuse(this.comunas_usadas, {  keys: ['Nombre']})

    document.addEventListener('click', this.close) 

  },
  beforeDestroy () {
    document.removeEventListener('click',this.close)
  },

  methods: {
    ...mapActions(['setCoords',  'setNAction', 'clickearComunaAction', 'clickearExamenAction', 'agregarExamenAction']),

  onEnterExamen(){
    if(this.resultado_fuse_examen.length > 0){
      this.agregarExamenAction(this.resultado_fuse_examen[0].item)
      if (this.comuna == -1)
        this.$refs.comuna.focus()
      else
        this.checkout()
    }
  },
  onEnterComuna(){
    if(this.resultado_fuse_comuna.length > 0){
      console.log((this.resultado_fuse_comuna[0].item))
      this.clickearComunaAction(this.resultado_fuse_comuna[0].item.id)
      if (this.examenes_agregados.length == 0)
        this.$refs.examen.focus()
      else
        this.checkout()
    }
  },
  checkout(){
    if(this.comuna != -1 && this.examenes_agregados.length>0){
      let n_personas = 0
      for (var z = 0; z < this.examenes_agregados.length; z++){
        if (this.examenes_agregados[z].cantidad > n_personas)
          n_personas = this.examenes_agregados[z].cantidad

      }
      this.setNAction(n_personas)
      this.$router.push({ name: 'FechaYHora' })
      }

  },
  async getMyComuna()
  {
    this.gettingComuna = 1;
    this.$getLocation({})
    .then(coordinates=>{
      this.setCoords(coordinates)
      
      axios.post(window.hostname+'api/getComunasCercanas',
      {lat:coordinates.lat,
      lon:coordinates.lng})
      .then(respuesta => {
        if (typeof(respuesta.data.resultados) == "object")
        {
            if(this.comunas_usadas.some(x=>{return x.id == respuesta.data.resultados[0].id}))
            {
              this.clickearComunaAction(respuesta.data.resultados[0].id)
              this.gettingComuna = 2;
            }
            else{
              this.gettingComuna = 3
            }
          
        }
      })
      .catch(error =>{
        this.gettingComuna = 4;
      }) 
      })
      .catch(error =>{
        this.gettingComuna = 4;
      })
    },

    close(e){
      if (!(e.target.classList.contains('search-exam-popup') || e.target.classList.contains('dont-close-exam') ) && this.focused_exam)
        this.focused_exam = false;
      if (!(e.target.classList.contains('search-prev-popup') || e.target.classList.contains('dont-close-prev') ) && this.focused_prev)
        this.focused_prev = false;
      if (!(e.target.classList.contains('search-comuna-popup') || e.target.classList.contains('dont-close-comuna') ) && this.focused_comuna)
      {
        this.comuna_buscado = '';
        this.$nextTick(() => this.focused_comuna = false);
      }

    },

    focusInputExam() {
      this.selected_examen = 0;
      if(!this.focused_exam)
        this.focused_exam = true;
      this.focused_comuna = false;
      this.focused_prev = false;
       setTimeout(()=>{this.$refs.examen.focus(), 100});
    },
    focusInputPrev() {
      this.selected_prevision = 0;
      if(!this.focused_prev)
        this.focused_prev = true;
      this.focused_comuna = false;
      this.focused_exam = false;
      setTimeout(()=>{this.$refs.prev.focus(), 100});
    },
    focusInputComuna(e) {
      if (typeof e !== 'undefined'){
        if(e.target.classList.contains('dont-close-btn')){
          return;
          }
      }
        if(!this.focused_comuna)
          this.focused_comuna = true;
        this.focused_exam = false;
        this.focused_prev = false;
        setTimeout(()=>{this.$refs.comuna.focus(), 100});
      
    },
    onClickExam(l){

      /*
      this.examen_buscado = '' //l.Nombre
      this.selected_examen = l.id
      this.focusInputPrev();
      */
     this.agregarExamenAction(l)
     this.focused_exam = false;
     
    },
    onClickInsti(l){
      this.selected_prevision = l.id
      this.prevision_buscado = ''//l.nombre
      this.focusInputComuna();
    },
    onClickComuna(l){
      /*
      if (this.selected_comunas.includes(l.id)){
        this.selected_comunas.splice(this.selected_comunas.indexOf(l.id), 1);
      }
      else{
        this.selected_comunas.push(l.id)
      }
      */
      this.clickearComunaAction(l.id)
      this.comuna_buscado = ''
      this.$refs.comuna.blur()
      this.focused_comuna = false
      //setTimeout(()=>{this.checkout()}, 500);
     
     
      //this.comuna_buscado = l.Nombre
    },

    onFocusExam(){},
      
  },
   computed: {
     ...mapGetters(['comunas', 'comuna', 'regiones', 'comunas_usadas', 'myCoords', 'hasCoords', 'examenes', 'examenes_agregados']),


  },
  watch: {
    examen_buscado(val){
      this.resultado_fuse_examen = this.fexamenes.search(val)
      if(!this.focused_exam)
        this.focused_exam = true;
    },
    prevision_buscado(val){
      this.resultado_fuse_insti = this.fInstituciones.search(val)
      if(!this.focused_prev)
        this.focused_prev = true;
    },
    comuna_buscado(val){
      this.resultado_fuse_comuna = this.fComunas.search(val)
      //if(!this.focused_comuna)
        //this.focused_comuna = true;
    },

    

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css);

.search-btn{
  position:absolute; 
  right:5px; 
  top: 5px; 
  border-radius:25px; 
  height:50px; 
  width:50px; 
  color:white; 
  outline:none; 
  border:none; 
  background:rgb(0, 191, 222);
  transition: width 0.1s linear .1s, background-color 0.1s linear 0.1s;  
}

.vl-exam{
  
  height: 30px;
  position: absolute;
  top:15px;
  left:507px;
  /*transition: border-left 0.01s linear 0.01s;*/
}

.vl-prev{
  border-left: 1px solid rgba(195,195,195,1);
  height: 30px;
  position: absolute;
  top:15px;
  left:70%;
  transition: left 0.1s linear .1s,
}

.location-button{
  background: rgb(237,237,237);
  width:290px;
  padding:5px;
  border: 1px solid rgb(247,247,247);
  border-radius: 15px;
  margin-left:20px;
  cursor: pointer;
}


.main-search-exam{
  padding-left:30px;
  height: Calc(100% - 2px);
  margin-top:1px;
  margin-left:3px;
  padding-top:10px;
  width:40%;
  border-radius: 25px 0px 0px 25px;
  display: inline-block;
  cursor: pointer;
  transition: max-width 0.1s linear .1s, height 1s linear .5s;
  transition: width 0.1s linear .1s, height 1s linear .5s;
}
.main-search-exam:hover{
  background: rgb(235,235,235);
}
.main-search-exam:hover input[type=text]{
  background: rgb(235,235,235);
}

.search-prev-popup{
  top:70px;
  background: white;
  width:440px;
  left: 250px;
  padding-top:20px;
  padding-bottom: 20px;
  border-radius: 25px;
  position:absolute;
  z-index: 9999;
  border: 1px solid rgba(200,200,200,1);
}

.search-comuna-popup{
  top:70px;
  background: white;
  width:100%;
  padding-top:20px;
  padding-bottom: 20px;
  border-radius: 25px;
  position:absolute;
  z-index: 999;
  border: 1px solid rgba(200,200,200,1);
}

.search-exam-popup{
  top:70px;
  background: white;
  width:100%;
  padding-top:20px;
  padding-bottom: 20px;
  border-radius: 25px;
  position:absolute;
  z-index: 999;
  border: 1px solid rgba(200,200,200,1);
}

.search-exam-popup ul, .search-prev-popup ul, .search-comuna-popup  ul{
  list-style-type: none;
  padding:0;
  margin:0;
}

.search-comuna-popup li{
  list-style-type: none;

  margin:0;
  padding-left:0px;
  font-size: 14px;
  cursor: pointer;
}

.search-prev-popup li{
  list-style-type: none;

  margin:0;
  padding-left:20px;
  font-size: 14px;
  cursor: pointer;
}
.search-exam-popup li {
  list-style-type: none;
  padding:10px 0px;
  margin:0;
  font-size: 14px;
  cursor: pointer;
}
.search-prev-popup li:hover{
  background: rgb(247,247,247);
}
.search-exam-popup li:hover{
  background: rgb(247,247,247);
}

.search-comuna-popup li:hover{
  background: rgb(247,247,247);
}


.main-search-comuna{
  padding-left:5px;
  padding-right:20px;
  height: Calc(100% - 2px);
  margin-top:1px;
  padding-top:10px;
  width:30%;
  border-radius: 0px 25px 25px 0px;
  display: inline-block;
  cursor: pointer;
  transition: width 0.1s linear .1s, height 1s linear .5s;
}
.main-search-comuna:hover{
  background: rgb(235,235,235);
}
.main-search-comuna:hover input[type=text]{
  background: rgb(235,235,235);
}


.main-search-prev{
  padding-left:25px;
  padding-right:40px;
  height: Calc(100% - 2px);
  margin-top:1px;
  padding-top:10px;
  width:30%;
  border-radius: 25px;
  display: inline-block;
  cursor: pointer;
}
.main-search-prev:hover{
  background: rgb(235,235,235);
}
.main-search-prev:hover input[type=text]{
  background: rgb(235,235,235);
}

.main-search input[type=text]{
  outline: none;
  font-size:14px;
  line-height:14px;
  border: 0px solid white;
  background: white;
  width:100%;

}
.main-search-title{
  font-size: 12px;
  font-weight: 700;
  text-align: left;

}

.main-search-container{
  padding:0px;
}
.main-search{
  position: relative;
  background: white;
  text-align: left;
  width:100%;
  height:60px;
  border-radius: 30px;
  margin: 0 auto;
  border: 0.5px solid rgba(0,0,0,0.15);
  /*
  box-shadow: 2px 3px 20px -1px rgba(0,0,0,0.81);
-webkit-box-shadow: 2px 3px 20px -1px rgba(0,0,0,0.81);
-moz-box-shadow: 2px 3px 20px -1px rgba(0,0,0,0.81);
border: 1px solid rgba(0,0,0,0.21)
*/

}
.main-image{
  /*min-height: ;*/
   background-repeat: no-repeat;
  background-size: cover;
  height: Calc(100vh - 160px);
}

@media only screen and (max-width: 1000px) {


}


.tags-container{
  color:white;
  display: inline-block;
  margin-top:8px;
  margin-left:10px;
}
.tag{
  display: inline-block;
  border: 1px solid white;
  border-radius: 10px;
  padding: 0px 10px;
  margin-left: 6px;
  margin-top: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
  font-size: 12px;
}
.tag:hover{
  display: inline-block;
  border: 1px solid white;
  background-color: white;
  color:black;
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
.alertaa2{
  position:absolute;
  right:5px;
  top:-79px;
  padding:10px;
  background:rgb(20, 134, 231);
  color:white;
  z-index:10001; 
  height:68px; 
  width:170px; 
  border-radius:10px; 
  border:2px solid rgb(15, 100, 200);
  font-weight: 700;
}
.alertaa2:before{
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

.glow {
  color: #fff;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
  animation-iteration-count: 5;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px rgb(255, 200, 9), 0 0 40px rgb(255, 200, 9), 0 0 50px rgb(255, 200, 9), 0 0 60px rgb(255, 200, 9), 0 0 70px rgb(255, 200, 9);
  }
  to {
    box-shadow: 0 0 20px #fff, 0 0 30px rgb(255, 200, 9), 0 0 40px rgb(255, 200, 9), 0 0 50px rgb(255, 200, 9), 0 0 60px rgb(255, 200, 9), 0 0 70px rgb(255, 200, 9), 0 0 80px rgb(255, 200, 9) !;
  }
}

</style>
