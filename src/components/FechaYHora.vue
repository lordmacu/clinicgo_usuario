<template>
<div>
  <TopNavD />
  <div style="text-align:left; margin-bottom:60px;" class="container">
  <div class="top-spacer"></div>
  <h2>Agendar una hora en {{comunas.filter(x=>{return x.id == comuna})[0].Nombre}}</h2>
    <p>
    Por favor, seleccione el día y la hora que más le acomode para tomar la muestra.

  </p>

  <div style="text-align:center; margin:auto; max-width:1200px; ">




            
                <div class="doble-columna">
                <div class="calendar boxy">
                  <div class="number">1</div>
                    <div class="msg-top">Seleccione una fecha en el calendario</div>
                    <div  class="button-container">
                      <h2 style="font-size:16px;">{{meses[viendoMes]}} del {{viendoAño}} </h2>
                      
                      <div v-on:click="restarMes()" class="btn-prev " ><b-icon style="transform:translateY(1px);" icon="arrow-left"/> </div>
                      <div v-on:click="sumarMes()" class="btn-next " ><b-icon style="transform:translateY(1px);" icon="arrow-right"/></div>
                    </div>
                 

                  <table>

                    <thead>

                      <tr>

                        <td v-for="d in dias_av">{{d}}</td>

                      </tr>
                    </thead>
                    <tbody>

                      <tr>
                        <td :class=" (i-mapping[new Date(viendoAño, viendoMes, 1).getDay()] == hoyDia && viendoMes == hoyMes && viendoAño == hoyAño) ? 'current-day': '' +
                        ((i-mapping[new Date(viendoAño, viendoMes, 1).getDay()] == selectedDia && viendoMes == selectedMes && viendoAño == selectedAño) ? 'selected-day':'') " v-for="i in 7"
                        v-on:click="seleccionarDia(i-mapping[new Date(viendoAño, viendoMes, 1).getDay()], viendoMes, viendoAño); tiSelected = -1; tfSelected = -1; combinaciones = []; verDisponibilidadSiPuede();">{{i-1 >= mapping[new Date(viendoAño, viendoMes, 1).getDay()] ? i-mapping[new Date(viendoAño, viendoMes, 1).getDay()] : '-'}}  </td>

                      </tr>
                      <tr v-if="UltimoDia(viendoAño, viendoMes) >= 7-(mapping[new Date(viendoAño, viendoMes, 1).getDay()])+1 + 7*(tr-1)" v-for="tr in 5">
                        <td 
                        v-on:click="seleccionarDia(7-(mapping[new Date(viendoAño, viendoMes, 1).getDay()])+td + 7*(tr-1), viendoMes, viendoAño); tiSelected = -1; tfSelected = -1; combinaciones = []; verDisponibilidadSiPuede();"
                        
                        :class="((7-(mapping[new Date(viendoAño, viendoMes, 1).getDay()])+td + 7*(tr-1) == hoyDia && viendoMes == hoyMes && viendoAño == hoyAño) ? 'current-day ': '')
                        +((7-(mapping[new Date(viendoAño, viendoMes, 1).getDay()])+td + 7*(tr-1) == selectedDia && viendoMes == selectedMes && viendoAño == selectedAño) ? 'selected-day':'')" 
                        v-for="td in 7">

                          {{UltimoDia(viendoAño, viendoMes) >= 7-(mapping[new Date(viendoAño, viendoMes, 1).getDay()])+td + 7*(tr-1) ? 7-(mapping[new Date(viendoAño, viendoMes, 1).getDay()])+td + 7*(tr-1):'-'}} 

                          </td>

                      </tr>
                    </tbody>

                  </table>

                </div>
                
                <div class="horarios boxy">
                  <div class="number">2</div>
                  <div class="msg-top">Seleccione un horario disponibles</div>                  
                <div style="text-align:left;" v-if="!cargando_disponibles">
                  <span v-if="buscadoDia != 0" style="font-size:14px; margin-bottom:0px; margin-left:5px; margin-top:15px;">Horas disponibles para el {{buscadoDia}} de {{meses[buscadoMes]}} de {{buscadoAño}}.</span>
                  <h4 v-if="horasDisponiblesC.length >0" style="margin-bottom:0px; margin-left:5px; margin-top:10px; font-size:14px;">Mañana</h4>
                  <div v-for="h in horasDisponiblesC" v-if="horasDisponiblesC.length >0 && h.desde < 720" class="horas" v-on:click="scrolltoend(); tiSelected = h.desde; tfSelected= h.hasta; categorias_selected_c = h.categorias;  $gtag.event('fechayhora-seleccionar_hora', {'event_category': 'agendar', 'event_label': h.desde, 'value': 1} );" :style="{background: h.desde == tiSelected && h.hasta == tfSelected ? 'rgb(20, 134, 231)': '', color: h.desde == tiSelected && h.hasta == tfSelected ? 'white': ''}" >{{timeConvert(h.desde)}} - {{timeConvert(h.hasta)}} </div>
                  <h4 v-if="horasDisponiblesC.length >0" style="margin-bottom:0px; margin-left:5px; margin-top:10px; font-size:14px;">Tarde</h4>
                  <div v-for="h in horasDisponiblesC" v-if="horasDisponiblesC.length >0 && h.desde >= 720" class="horas" v-on:click="scrolltoend(); tiSelected = h.desde; tfSelected= h.hasta; categorias_selected_c = h.categorias; $gtag.event('fechayhora-seleccionar_hora', {'event_category': 'agendar', 'event_label': h.desde, 'value': 1} );" :style="{background: h.desde == tiSelected && h.hasta == tfSelected ? 'rgb(20, 134, 231)': '', color: h.desde == tiSelected && h.hasta == tfSelected ? 'white': ''}" >{{timeConvert(h.desde)}} - {{timeConvert(h.hasta)}} </div>
                  <div style="font-style: italic;" v-if="horasDisponiblesC.length == 0 && buscadoDia != 0">No se encontraron horas para este día. Por favor, intenta buscando en otro.</div>
                </div>
                <div v-if="cargando_disponibles">
                    <div style="width:100%; text-align:center; padding:20px; padding-bottom:40px;">
        
                    <div class="spinner-border text-secondary" style="margin: 0 auto; " role="status"></div>
                      <div style="display: inline-block; transform:translate(6px, -5px);"> Cargando...</div>
                  </div>  
                </div>
                </div>   
                  
              </div>
      <!--
      <router-link :to="{name:'Home'}" tag="button" style="margin-top:10px; float:left;" class="btn btn-secondary"><b-icon style="transform:translateY(2px);" icon="arrow-left-circle"/> Volver</router-link>
      <button id="botoncontinuar" v-on:click="setData(selectedDia, selectedMes, selectedAño, tiSelected, tfSelected, categorias_selected_c)" style="margin-top:10px; float:right;" v-bind:class="{'btn-success': tiSelected != -1, 'btn-danger': tiSelected == -1}" class="btn">Continuar a datos <b-icon style="transform:translateY(2px);" icon="arrow-right-circle"/></button>
-->
      <div style="position:fixed; bottom:60px; left:0px; z-index:9999; width:100%;">
        <div class="container" style="position:relative;">
          <div style="position:absolute; right:0px;" :style="{'opacity': alerta && tiSelected == -1 ? '1':'0'}" class="alerta alert alert-danger">
            Debes seleccionar un horario
          </div>
        </div>
      </div>

      <div style="position:fixed; left:0px; height:80px; bottom:0px; width:100vw; background:white; border-top:1px solid rgb(214,214,214); ">
          <div style="">
          <div class="container" style="position:relative">
            <div style="display:inline-block; margin-top:30px; width:100%; padding-left:68px; padding-right:90px; text-align:center;">
                Total orden: <span style="color: rgb(20, 134, 231); font-weight:700; "> ${{Intl.NumberFormat('de-DE').format(examenes_agregados.reduce((x, y)=>{return x+y.precio*y.cantidad}, 0) + costo_servicio+(n_personas*costo_servicio_pendiente))}} </span>
            </div>
          <button @mouseleave="alerta = false" @mouseenter="alerta = true" v-on:click="setData(selectedDia, selectedMes, selectedAño, tiSelected, tfSelected, categorias_selected_c)" style="font-size:14px;  position:absolute; right:10px; top:25px; padding:7px 4px;" v-bind:class="{'btn-success': tiSelected != -1, 'glow':tiSelected != -1, 'btn-danger': tiSelected == -1}" class="btn">Datos <b-icon style="transform:translateY(2px);" icon="arrow-right-circle"/></button>
          <router-link :to="{name:'Home'}" tag="button" style="font-size:14px; position:absolute; left:0px; top:25px; width:70px; padding:7px 0px;" class="btn btn-secondary"><b-icon style="transform:translateY(2px);" icon="arrow-left-circle"/> Volver</router-link>
        </div>
        </div>
      </div>

        <div class="bottom-spacer"></div>
        <!--<button class="btn btn-cg btn-warning">aaaa</button>-->
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
  components: {
    TopNavD,
  },
  data() {
    return {

    idComuna:this.comunaId,
    idPrestacion:this.prestacionId,
    nombrex:this.nombreCentro,
    idCentro:this.centroID,
    listaServicios:this.serviciosLista,
    pag:1,
    prestador_seleccionado: {},
    loading:true,
    datos:[],
    alerta:false,


    
      servicios:[],
      sucursales:[],
      horasDisponibles:[],


      showinFuncionesList:false,
      descripcion:'',
      nombre:'',
      selectedSucursal:0,
      selectedServicio:0,
      selectedCombinacion:[],
      serviciosC:[],
      horasDisponiblesC:[],
      combinaciones:[],

      tiSelected:-1,
      tfSelected:-1,
      categorias_selected_c:[],
      

      viendoMes:0,
      viendoAño:0,

      selectedDia:-1,
      selectedMes:-1,
      selectedAño:-1,

      buscadoDia:0,
      buscadoMes:0,
      buscadoAño:0,


      hoyMes:0,
      hoyDia:0,
      hoyAño:0,
      modalState:0,

      hoy:0,

      mapping:[6, 0, 1, 2, 3, 4, 5],

      meses:['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      dias:['Lunes','Martes','Miércoles','Jueves','Viernes', 'Sabado', 'Domingo'],
      dias_av:['Lu','Ma','Mi','Ju','Vi', 'Sa', 'Do'],

      cargando_disponibles:false,
      cargando_combinaciones:false,

      buscadoHoras:false,
    }
  },
  created() {
    if(this.examenes_agregados.length == 0 || this.comuna == -1)
      this.$router.push({ name: 'Home' })
    this.hoy = new Date();
    this.hoyMes = this.hoy.getMonth();
    this.hoyDia = this.hoy.getDate();
    this.hoyAño = this.hoy.getFullYear();
    this.viendoDia = this.hoyDia;
    this.viendoMes = this.hoyMes;
    this.viendoAño = this.hoyAño;
  },
  destroyed() {

  },
  methods: {
    ...mapActions(['clickearExamenAction', 'setFechaYHoraAction', 'setOrdenFinalAction']),
    scrolltoend(){
      window.scrollTo(0,document.body.scrollHeight);
    },
    setData(dia, mes, año, inicio, termino, categorias_selected_c){
      if (this.selectedDia != -1 && this.selectedMes != -1 && this.selectedAño != -1 && this.tiSelected != -1 && this.tfSelected != -1){
      

        this.setFechaYHoraAction({dia:dia, mes:mes, año:año, inicio:inicio, termino:termino, categorias_selected:categorias_selected_c})
        this.$router.push({ name: 'DatosPersonales' })
        this.$gtag.event('fechayhora-continuar', {'event_category': 'agendar', 'event_label': 'correcto', 'value': 1} );
        this.setOrdenFinalAction({orden:[], direccion:'', depto:'', n_depto:''})
      }
      else{
        this.$gtag.event('fechayhora-continuar', {'event_category': 'agendar', 'event_label': 'incorrecto', 'value': 1} );
      }
    },

    verDisponibilidadSiPuede(){
        this.cargando_disponibles = true;
        axios.post(window.hostname+'api/getDisponibles',
        {examenes:this.examenes_agregados,
        
        dia:this.selectedDia,
        mes:this.selectedMes,
        año:this.selectedAño,
        comuna_id:this.comuna,})
        .then(resp => 
        {
          this.horasDisponibles = resp.data.horarios_posibles;
          this.cargando_disponibles = false;
          this.buscadoDia = this.selectedDia;
          this.buscadoMes = this.selectedMes;
          this.buscadoAño = this.selectedAño;
          window.scrollTo(0,document.body.scrollHeight);

        })
        .catch(e=>{          
          this.cargando_disponibles = false;

        })

    },
    comunicar(){
      this.$emit('selecciono', {tf:this.tfSelected, ti:this.tiSelected, dia:this.selectedDia, mes:this.selectedMes, año:this.selectedAño})
    },
    timeConvert(n) {
      var num = n;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return (rhours < 10 ? '0':'')+rhours + ":"+ (rminutes < 10 ? '0':'') + rminutes + "";
    },
    seleccionarDia(d,m,a){
      let dia = new Date(a, m, d)
      let hoyDia = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), this.hoy.getDate())
      if(dia.getTime() >= hoyDia.getTime())
      {
        this.selectedDia = d
        this.selectedMes = m
        this.selectedAño = a
        this.$gtag.event('fechayhora-seleccionar_dia', {'event_category': 'agendar', 'event_label': 'correcto', 'value': 1} );
      }
      else
      {
        this.$gtag.event('fechayhora-seleccionar_dia', {'event_category': 'agendar', 'event_label': 'incorrecto', 'value': 1} );
        //this.$notify({ title: 'Error', text: 'Este día ya pasó!.', type: 'error'})
      }
      

    },
    sumarMes(){
      if (this.viendoMes == 11)
      {
        this.viendoMes = 0;
        this.viendoAño += 1
      }
      else{
        this.viendoMes += 1
      }
    },
      restarMes(){
      if (this.viendoMes == 0)
      {
        this.viendoMes = 11;
        this.viendoAño -= 1
      }
      else{
        this.viendoMes -= 1
      }

    },
    UltimoDia(y, m){
      return new Date(y, m+1, 0).getDate()
    },
       
  },
  computed: {
    ...mapGetters(['isLoggedIn','usuario_datos',  'costo_servicio', 'costo_servicio_pendiente',  'n_personas','comuna', 'comunas', 'examenes', 'examenes_agregados', 'dia'])

  },
    watch: {
     horasDisponibles : function(){
      var ret = []

      for (var i  = 0; i < this.horasDisponibles.length; i++)
      {
        ret.push({
        'desde': this.horasDisponibles[i].desde,
        'hasta': this.horasDisponibles[i].hasta, 
        'dia': this.horasDisponibles[i].dia, 
        'mes': this.horasDisponibles[i].mes, 
        'año': this.horasDisponibles[i].año,
        'categorias': this.horasDisponibles[i].categorias,
        'seleccionado':false})
      }
      this.horasDisponiblesC = ret

    },

  },
}
</script>
<style scoped>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css);
@import url(https://fonts.googleapis.com/css?family=Poppins);


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

.form-group{
text-align: left;
padding-left:4px;

}
.bottom-spacer{
  height:0px;
}
.fade-leave-active{
  transition: opacity 0s;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.msg-top{
  text-align:left; margin-left:60px; height:40px; line-height:30px;
}
/* ---------- GENERAL ---------- */
.combinaciones{
  padding: 10px; width:100%; border:2px solid rgba(0,0,0,0.3); border-radius:5px; margin-bottom:14px; cursor: pointer;
}
.combinaciones:hover{
  border:2px solid #00addf;
}
.horas{
  border:1px solid rgba(0,0,0,0.7); 
  border-radius:5px; 
  margin: 4px 5px; 
  padding:4px 5px 3px 5px; 
  font-size: 16px;
  color: rgba(0,0,0,0.7);
  display:inline-block; 
  transition: 200ms;
}
.horas:hover{
  background: rgb(20, 134, 231);
  color:white;
  cursor: pointer;
}
.isActive{
  max-height:450px;
  padding:20px !important;
  transition: max-height 0.25s ease-in;
}
.isInActive{
  max-height:0px;
  padding:0px;
  transition: max-height 0.15s ease-out;
}


table {
	border-collapse: collapse;
	border-spacing: 0;
  width:100%;
}


/* ---------- CALENDAR ---------- */
.mobile{
  display: none;
}
.number{
  text-align: center;
  position:absolute;
  left:30px;
  border: 2px dashed rgba(0,0,0, 0.7);
  color: rgba(0,0,0, 0.7);
  border-radius: 50%;
  width:30px;
  height:30px;
  line-height: 30px;
}
.doble-columna{
  vertical-align: top;
  margin-top:0px;
  display: grid;
  
}
.calendar {
  position: relative;
	text-align: center;
  width:425px;
  display: inline-block;
    grid-column: 1;
  grid-row: 1;
  min-height:434px;
}
.horarios{
  margin-top:0px;
  position: relative;
  display: inline-block;

  width:525px;
    grid-column: 2;
  grid-row: 1;
}

.calendar header {
  position: relative;
  width:350px;
	
}
.button-container{
  position: relative;
  display: inline-block;
  margin-top:0px;
  height:20px;
  width:300px;
}
.calendar h2 {
	/*text-transform: uppercase;*/
}

.calendar thead {
	font-weight: 600;
	text-transform: uppercase;
}

.calendar tbody {
	color: #7c8a95;
}

.calendar tbody td:hover {
	border: 2px solid rgb(20, 134, 231);
}

.calendar td {
  font-size: 12px;
  cursor: pointer;
	border: 2px solid transparent;
	border-radius: 50%;
	display: inline-block;
	height: 50px;
	line-height: 50px;
	text-align: center;
	width: 50px;
}

.calendar .prev-month,
.calendar .next-month {
	color: #cbd1d2;
}

.calendar .prev-month:hover,
.calendar .next-month:hover {
	border: 2px solid #cbd1d2;
}

.current-day {
	background: black;
	color: #f9f9f9;
}
.selected-day {
	background: rgb(20, 134, 231);
	color: #f9f9f9;
}



.event:after {
	background: rgb(20, 134, 231);
	border-radius: 50%;
	bottom: .5em;
	display: block;
	content: '';
	height: .5em;
	left: 50%;
	margin: -.25em 0 0 -.25em;
	position: absolute;
	width: .5em;
}

.event.current-day:after {
	background: #f9f9f9;
}

.btn-prev,
.btn-next {
	border: 2px solid #cbd1d2;
	border-radius: 50%;
	color: #cbd1d2;
	height: 30px;
	font-size: .75em;
	line-height: 2em;
	top: -3px;
  cursor: pointer;

	position:absolute;
	width: 30px;
}

.btn-prev:hover,
.btn-next:hover {
	background: #cbd1d2;
	color: #f9f9f9;
}

.btn-prev {
	left: 10px;
}

.btn-next {
	right: 10px;
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
h1{
  color: rgba(0,0,0, 0.6);
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0 4px;
}
li:hover {
  background: rgb(40, 150, 249);
  color:white !important;

}

.object-container{
  padding: 0px 0px 10px 10px;
  display:block;
  float:left;
}
.editIcons{
  cursor: pointer;
  margin-right:10px;
}

.object{
  background-color: white;
  /*margin: 10px 0px 10px 10px;*/
  border-radius: 5px;
  width:100%;
  display:block;
  float:left;
  height:auto;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 8px;
  padding:20px;
}
.shadow-object{
  background-color: white;
  /*margin: 10px 0px 10px 10px;*/
  border-radius: 5px;
  height:auto;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 3px 8px;
  padding:2px;
}

.main{
  width:100%;
  min-height:100vh;
}
.column-right{
  background-color: rgb(242, 247, 251);
  padding-top:80px;
  text-align:left;
  width:100%;
  max-height:100vh;
}
.column-left{

  height:100vh;
  float: left;

}

.boxy{
  padding:10px;
  height:100%;
  background: white;
  border-radius: 20px;
}
h4{
  font-size: 16px;
  font-weight: 700;
  margin-bottom:30px;
}
.top-spacer{
  height:130px;
}
@media only screen and (max-width: 350px) {


.calendar {
  position: relative;
	text-align: center;
  width:310px !important;
  display: inline-block;
    grid-column: 1;
  grid-row: 1;
  min-height:434px;
}

  .calendar header {
  position: relative;
  width:320px;
	
}
.button-container{
  position: relative;
  display: inline-block;
  margin-top:0px;
  height:20px;
  width:300px;
}
.calendar h2 {
	/*text-transform: uppercase;*/
}

.calendar thead {
	font-weight: 600;
	text-transform: uppercase;
}

.calendar tbody {
	color: #7c8a95;
}

.calendar tbody td:hover {
	border: 2px solid rgb(20, 134, 231);
}

.calendar td {
  font-size: 12px;
  cursor: pointer;
	border: 2px solid transparent;
	border-radius: 50%;
	display: inline-block;
	height: 40px;
	line-height: 40px;
	text-align: center;
	width: 40px;
}

.calendar .prev-month,
.calendar .next-month {
	color: #cbd1d2;
}

.calendar .prev-month:hover,
.calendar .next-month:hover {
	border: 2px solid #cbd1d2;
}

.current-day {
	background: black;
	color: #f9f9f9;
}
.selected-day {
	background: rgb(20, 134, 231);
	color: #f9f9f9;
}


}
@media only screen and (max-width: 1200px) {
  .top-spacer{
  height:85px;
}
.bottom-spacer{
  height:90px;
}
}
@media only screen and (max-width: 1000px) {
  .top-spacer{
  height:85px;
}
.bottom-spacer{
  height:60px;
}
  .mobile{
    display: block;
  }
  .main-cont{
  padding-top:10px;
}
  .calendar{
    width:100%;
    float:none;
  }

  .number{
  position:absolute;
  left:5px;
  top:10px;
  width:30px;
  height:30px;
  line-height: 30px;
}
.doble-columna{
  margin-top:10px;
  text-align: center;
}
.calendar {
  float:none;
  position: relative;
	text-align: center;
  width:350px;
  max-width:480px;
  display: inline-block;
  margin:auto;

}
.boxy{
  padding:0px;
  margin: 0;
}
.msg-top{
  padding-top:10px;
  margin-left:40px;
}
.horarios{

  position: relative;
  display: block;
  max-width:480px;
  width:100%;
  margin-left:0;
  margin-top:0px;
  grid-column: 1;
  grid-row: 2;
}
}
.btn-cg{
  background-color: rgb(255, 200, 9) !important;
  color:white !important;
}
.btn-cg:hover{
  background-color: rgb(255, 180, 7) !important;
  color:white !important;
}
.btn-cg:active, .btn-cg:visited{
  outline-color: red;
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
    box-shadow: 0 0 20px #198754, 0 0 20px #198754, 0 0 30px #198754, 0 0 40px #198754, 0 0 50px #198754, 0 0 60px #198754, 0 0 70px #198754;
  }
  to {
    box-shadow: 0 0 10px #198754, 0 0 30px #198754, 0 0 40px #198754 0 0 50px #198754, 0 0 60px #198754, 0 0 70px #198754, 0 0 80px #198754;
  }
}


</style>