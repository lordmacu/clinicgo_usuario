<template>
  <div>
  <div v-if="loaded" class="home" style="background-color:rgba(250,250,250,1); min-height:100vh;">
    <TopNavD  />

    <div v-if="estado == 4" style="padding-top:140px;">
      <div><h2>¡Pago realizado!</h2></div> 
      <b-icon style="height:200px; width:200px; color:green;" icon="check-circle"/>
      <div>¡El pago se realizo con éxito! Pronto estaremos en contacto contigo.</div>
      <router-link :to="{name:'Home'}"> Volver</router-link>
    
    </div>
    <div v-if="estado == 1" style="padding-top:140px;">
      <div><h2>¡Orden realizada!</h2></div> 
      <b-icon style="height:200px; width:200px; color:green;" icon="check-circle"/>
      <div>¡La orden se ha agendado exitosamente! <strong>Te enviamos un email con la información de la orden</strong>. Recuerda que deberás hacer el pago antes de recibir los resultados.</div>
      <router-link :to="{name:'Home'}"> Volver</router-link>
    
    </div>
    <div v-if="estado == 10" style="padding-top:140px;">
      <div><h2>¡Pago no realizado!</h2></div> 
      <b-icon style="height:200px; width:200px; color:red;" icon="x-circle"/>
      <div>¡Ocurrió un error en la transacción! Por favor, intente nuevamente.</div>
      <router-link :to="{name:'Home'}"> Volver</router-link>
    
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
  props:['id'],
  components: {
    TopNavD,
  },
  data() {
    return {
      estado:-1,
      loaded:false,

    }
  },
  created() {
    
    
        axios.post(window.hostname+'api/orden_get_estado',
        {
         orden_id:this.$route.params.id 
        })
        .then(r=>{
          this.loaded = true
          this.estado = r.data.estado
          if (this.estado == 1 || this.estado == 4)
            this.vaciarCarroAction()
        })
        .catch(e=>{
          this.loaded = true
          console.log(e)
            
        })

  },
  destroyed() {

  },
  methods: {
    ...mapActions(['clickearExamenAction', 'vaciarCarroAction']),

  },
  computed: {
    ...mapGetters(['isLoggedIn','usuario_datos', 'comuna', 'comunas', 'examenes_agregados'])

  },
}
</script>
