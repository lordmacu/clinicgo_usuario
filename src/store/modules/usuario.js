import axios from 'axios';
import router from '@/router'

const state = {

    /*datos usuario*/
    usuario_datos:[],
    token: localStorage.getItem('token_usuario') || '',
    isLoggedIn: false,
    /*misc*/
    usuario_cargando:0,
    usuario_iniciado:false,


};

const getters = {
    usuario_datos: state => state.usuario_datos,
    isLoggedIn: state => state.isLoggedIn,
    usuario_iniciado: state => state.usuario_iniciado,
};

const actions = {
    getUsuario(context, payload){
        return new Promise((resolve, reject) => {
            context.commit('startLoading')
            axios({url:window.hostname+'api/usuario/getuserbytoken', method: 'GET' })
            .then(resp => {
                const user = resp.data.user
                const data ={'token_usuario': localStorage.token, 'user': user}
                context.commit('auth_success', data)
                context.commit('stopLoading')
                resolve(resp)
            })
            .catch(err => {
                console.log(err.response)
                context.commit('logout')
                context.commit('stopLoading')
                localStorage.removeItem('token_usuario')
                reject(err)
            })
        })
    },
    logoutUsuario(context){
        localStorage.removeItem('token_usuario')
        context.commit('logout')
        router.push('/Login')
    },
    loginUsuario(context, user){
        return new Promise((resolve, reject) => {
            context.commit('startLoading')
            axios({url: window.hostname+'api/usuario/login', data: user, method: 'POST' })
            .then(resp => {
                const token = resp.data.token
                const user = resp.data.user
                const data = {'token': token, 'user': user}
                localStorage.setItem('token_usuario', token)
                axios.defaults.headers.common['Authorization'] = token
                context.commit('auth_success', data)
                context.commit('stopLoading')
                
                resolve(resp)
            })
            .catch(err => {
                context.commit('stopLoading')
                context.commit('logout')
                localStorage.removeItem('token_usuario')
                reject(err)
            })
        })
    },

};

const mutations = {
    auth_success(state, data){        
        state.usuario_datos = data.user
        state.isLoggedIn = true
      },
    logout(state){
        state.usuario_datos = []
        state.isLoggedIn = false
        state.token = ''
      },
      startLoading: (state) => {state.cargando = 1},
      stopLoading: (state) => {state.cargando = 0},

};

export default{
    state,
    getters,
    actions,
    mutations,
};