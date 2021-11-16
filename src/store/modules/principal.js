import axios from 'axios';

const state = {

    comunas:[],
    regiones:[],
    examenes:[],
    comunas_usadas:[],
    costo_servicio:0,
    costo_servicio_pendiente:0,

    hasCoords: false,
    myCoords: {
        lat:0,
        lng:0
    },

};

const getters = {
    comunas: state => state.comunas,
    comunas_usadas: state => state.comunas_usadas,
    examenes: state => state.examenes,
    instituciones: state => state.instituciones,
    regiones: state => state.regiones,
    tipos: state => state.tipos,
    hasCoords: state => state.hasCoords,
    myCoords: state=> state.myCoords,
    costo_servicio: state=> state.costo_servicio,
    costo_servicio_pendiente: state=> state.costo_servicio_pendiente,
};

const actions = {


    setCoords({commit}, payload){
        commit('setCoordinates', payload)        
    },


    async initialize({commit}){


        /*Funcion recursiva */
        function initi()
        {
        axios({url:window.hostname+'api/initialize', method: 'GET'}).then(response => 
            {
               
                commit('setData', response.data)

            }).catch(err => 
            {
                if (err.response)
                {
                    initi();
                }
            })
        }

    initi(); //se llama a si misma hasta que funcione

     
    }
};

const mutations = {
    setData: (state, data) => {
        state.comunas = data.comunas;
        state.comunas_usadas = data.comunas_usadas;
        state.examenes = data.examenes;
        state.tipos = data.tipos;
        state.regiones = data.regiones;
        state.instituciones = data.instituciones;
        state.costo_servicio = data.costo_servicio;
        state.costo_servicio_pendiente = data.costo_servicio_pendiente;

    },
    setCoordinates: (state, data) =>{
        state.hasCoords = true;
        state.myCoords = data;
    }

};

export default{
    state,
    getters,
    actions,
    mutations,
};