import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

const qs = require('querystring')
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loginUser: Cookies.get('loginUser'),
        token: Cookies.get('token')
    },
    mutations: {
        SET_LOGINUSER(state, user){
            state.loginUser = user
        },
        SET_TOKEN(state, token){
            state.token = token
        }
    },
    actions: {
        loginAction({commit}, payload){
            return new Promise((resolve, reject) => {
                axios({
                    url: '/api/sys/login',
                    method: 'post',
                    data: qs.stringify(payload)
                }).then(resp => {
                    // console.log(resp)
                    const result = resp.data
                    if(result.code === 2){
                        commit('SET_LOGINUSER', result.data.user.account)
                        commit('SET_TOKEN', result.data.token)
                        Cookies.set('loginUser', result.data.user.account)
                        Cookies.set('token', result.data.token)
                        resolve()
                    }else{
                        reject(result.message)
                    }
                })
            })
        }
    }
})

export default store