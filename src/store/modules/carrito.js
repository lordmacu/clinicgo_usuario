import axios from 'axios';

const state = {
    comuna:-1,
    examenes_agregados: JSON.parse(localStorage.getItem("examenes_agregados")) || [],
    inicio:-1,
    termino:-1,
    dia:-1,
    mes:-1,
    año:-1,

    
    direccion:'',
    apellido1:'',
    //vapellido2:'',
    nombre:'',
    departamento:'',
    rut:'',
    email:'',
    telefono:'',
    n_depto:'',
    n_personas: Math.min(parseInt(localStorage.getItem("n_personas")), 10) || 1,
    categorias_selected:[],
    orden_final:[],
    receta_medica:null,

};

const getters = {
    examenes_agregados: state => state.examenes_agregados,
    comuna: state => state.comuna,
    dia: state => state.dia,
    mes: state => state.mes,
    año: state => state.año,
    inicio: state => state.inicio,
    termino: state => state.termino,
    direccion: state => state.direccion,
    apellido1: state => state.apellido1,
    //apellido2: state => state.apellido2,
    nombre: state => state.nombre,
    departamento: state => state.departamento,
    rut: state => state.rut,
    email: state => state.email,
    telefono: state => state.telefono,
    n_depto: state => state.n_depto, 
    n_personas: state => state.n_personas, 
    categorias_selected: state => state.categorias_selected, 

    orden_final: state => state.orden_final,
    receta_medica: state => state.receta_medica,

};

const actions = {

    agregarExamenAction({commit}, payload){
        commit('agregarExamen', payload)        
    },
    quitarExamenAction({commit}, payload){
        commit('quitarExamen', payload)        
    },
    clickearExamenAction({commit}, payload){
        commit('clickearExamen', payload)        
    },
    clickearComunaAction({commit}, payload){
        commit('setComuna', payload)        
    },
    setFechaYHoraAction({commit}, payload){
        commit('setFechaYHora', payload)        
    },
    vaciarCarroAction({commit}, payload){
        commit('vaciarCarro', payload)        
    },
    setDatosPersonalesAction({commit}, payload){
        commit('setDatosPersonales', payload)        
    },
    cambiarCantidadAction({commit}, payload){
        commit('cambiarCantidad', payload)        
    },
    cambiarCantidadPersonasAction({commit}, payload){
        commit('cambiarCantidadPersonas', payload)        
    },
    dpAgregarExamenAction({commit}, payload){
        commit('dpAgregarExamen', payload)        
    },
    dpQuitarExamenAction({commit}, payload){
        commit('dpQuitarExamen', payload)        
    },
    setNAction({commit}, payload){
        commit('setN', payload)        
    },
    setOrdenFinalAction({commit}, payload){
        commit('setOrdenFinal', payload)        
    },
    setRecetaMedicaAction({commit}, payload){
        commit('setRecetaMedica', payload)        
    },
    

};

const mutations = {
    setComuna: (state, data) =>{
        state.comuna = data;
    },
    setRecetaMedica: (state, data) =>{
        state.receta_medica = data;
    },
    agregarExamen(state, data){
        for (var i = 0; i < state.examenes_agregados.length; i++){
            if (state.examenes_agregados[i].id == data.id){
                return
            }
        }
        data.cantidad = 1;
        state.examenes_agregados.push(data)
        localStorage.setItem("examenes_agregados", JSON.stringify(state.examenes_agregados));
    },
    cambiarCantidad(state, data){
        var ind = state.examenes_agregados.findIndex(x=>{return x.id == data.eid});
        if(data.cantidad > 0)
            state.examenes_agregados[ind].cantidad = data.cantidad;
        else
            state.examenes_agregados.splice(ind, 1)
        localStorage.setItem("examenes_agregados", JSON.stringify(state.examenes_agregados));
        var max = 1
        for(var i = 0; i < state.examenes_agregados.length; i++){
            if(max < state.examenes_agregados[i].cantidad)
                max = state.examenes_agregados[i].cantidad
        }
        state.n_personas = max;
        localStorage.setItem("n_personas", state.n_personas);
    },
    cambiarCantidadPersonas(state, data){
        var n_examenes = 0;
        for (var u = 0; u < state.examenes_agregados.length; u++){
            n_examenes += state.examenes_agregados[u].cantidad;
        }
        console.log(n_examenes)
        if(data.cantidad > 0)
        {
            if (data.cantidad <= n_examenes)
                state.n_personas = data.cantidad;
            else
                state.n_personas = n_examenes;
        }
        localStorage.setItem("n_personas", state.n_personas);

    },
    setFechaYHora: (state, data) => {

        state.dia = data.dia;
        state.año = data.año;
        state.mes = data.mes;

        state.inicio = data.inicio;
        state.termino = data.termino;
        state.categorias_selected = data.categorias_selected;

    },
    setDatosPersonales: (state, data) => {
        state.direccion = data.direccion;
        state.apellido1 = data.apellido1;
        //state.apellido2 = data.apellido2;
        state.nombre = data.nombre;
        state.departamento = data.depto;
        state.rut = data.rut;
        state.email = data.email;
        state.telefono = data.telefono;
        state.n_depto = data.n_depto;

    },
    vaciarCarro(state){
        state.examenes_agregados = []
        state.n_personas = 1
        state.orden_final = []
        localStorage.setItem("n_personas", state.n_personas);
        localStorage.setItem("examenes_agregados", JSON.stringify(state.examenes_agregados));
    },
    quitarExamen: (state, data) =>{
        for(var i = 0; i < state.examenes_agregados.length; i++){
            if (state.examenes_agregados[i].id == data.id){
                state.examenes_agregados.splice(i, 1)
                localStorage.setItem("examenes_agregados", JSON.stringify(state.examenes_agregados));
                break;
            }
        }
        var max = 1
        for(var i = 0; i < state.examenes_agregados.length; i++){
            if(max < state.examenes_agregados[i].cantidad)
                max = state.examenes_agregados[i].cantidad
        }
        state.n_personas = max;
        localStorage.setItem("n_personas", state.n_personas);

        return;
    },
    clickearExamen(state, data){
        for (var i = 0; i < state.examenes_agregados.length; i++){
            if (state.examenes_agregados[i].id == data.id){
                state.examenes_agregados.splice(i, 1)
                localStorage.setItem("examenes_agregados", JSON.stringify(state.examenes_agregados));
                return
            }
        }
        data.cantidad = 1
        state.examenes_agregados.push(data)
        localStorage.setItem("examenes_agregados", JSON.stringify(state.examenes_agregados));
    },
    dpAgregarExamen(state, data){
        for (var i = 0; i < state.examenes_agregados.length; i++){
            if (state.examenes_agregados[i].id == data.id){
                state.examenes_agregados[i].cantidad += 1
                localStorage.setItem("examenes_agregados", JSON.stringify(state.examenes_agregados));
                return
            }
        }
        let ex = data
        data.cantidad = 1
        state.examenes_agregados.push(data)

    },
    dpQuitarExamen(state, data){
        for (var i = 0; i < state.examenes_agregados.length; i++){
            if (state.examenes_agregados[i].id == data.id){
                if (state.examenes_agregados[i].cantidad == 1)
                    state.examenes_agregados.splice(i, 1)
                else
                    state.examenes_agregados[i].cantidad -= 1
                localStorage.setItem("examenes_agregados", JSON.stringify(state.examenes_agregados));
                return
            }
        }
    },
    setN(state, n){
        state.n_personas = n
    },
    setOrdenFinal(state, o){
        state.orden_final = o.orden
        state.direccion = o.direccion
        state.departamento = o.depto
        state.n_depto = o.n_depto
    },

};

export default{
    state,
    getters,
    actions,
    mutations,
};