<template>
  <div class="home" style="min-height:100vh;">
    <TopNavD  />

<div style="margin-top:80px;">

  <h1 style="margin-bottom:100px; padding-top:60px;">¿Tienes una orden médica?</h1>
  <div style="width:260px; margin:0 auto; position:relative;">
  <label class="btn-subir-foto" style="margin-bottom:40px;" for="files">Subir orden médica <b-icon icon="camera"></b-icon></label>
  <div v-if="receta_medica != null" style="position:absolute; top:48px; left:18px;">{{receta_medica.name}} <b-icon icon="check"></b-icon></div>
<input v-on:change="change_file()" id="files" ref="file"  type="file" accept="image/*" style="visibility:hidden; width:0px;" />
<div class="btn-subir-foto">Saltar por ahora <b-icon icon="arrow-right"></b-icon></div>
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
      viendoTerminos:false,
      viendoPoliticas:false,
      aceptoTerminos:false,
      loading_transferencia:false,
      loading_transbank:false,
    
    }
  },
  created() {




  },
  beforeDestroy () {

  },
  methods: {
    ...mapActions(['clickearExamenAction', 'cambiarCantidadAction', 'cambiarCantidadPersonasAction', 'setRecetaMedicaAction']),

  change_file(){
    console.log(this.$refs.file.files[0])
    this.setRecetaMedicaAction(this.$refs.file.files[0])
  },

  },
  watch:{

  },
  computed: {
    ...mapGetters([
    'receta_medica',
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
  },
}
</script>
<style scoped>
.btn-subir-foto{
  background-image: linear-gradient(to right, rgb(20, 134, 231), rgb(105, 191, 255), rgb(105, 191, 255));
  background-size: 200%;
  color:white;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition:0.1s;
  width:220px;
  margin: 5px auto;
}
.btn-subir-foto:hover{
  background-image: linear-gradient(to right, rgb(20, 134, 231), rgb(105, 191, 255), rgb(105, 191, 255));
  background-size: 100%;

}
</style>