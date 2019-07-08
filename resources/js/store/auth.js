import { OK, UNPROCESSABLE_ENTITY, CREATED } from '../util'

const state = {
  user: null,
  apiStatus: null,
  loginErrorMessage: null,
  registerErrorMessages: null
}

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : '',
  user_id: state => state.user ? state.user.id: ''
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setApiStatus(state, status){
    state.apiStatus = status
  },
  setErrorLoginMessage(state, message){
    state.loginErrorMessage = message
  },
  setErrorRegisterMessage(state, message){
    state.registerErrorMessages = message
  }
}

const actions = {
  async register (context, data) {
    context.commit('setErrorRegisterMessage', null)
    const response = await axios.post('/api/register', data).catch(err => err.response || err)

    if(response.status === CREATED){
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }

    context.commit('setApiStatus', false)

    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit('setErrorRegisterMessage', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }

  },
  async login (context, data) {
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/login', data).catch(err => err.response || err)

    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }

    context.commit('setApiStatus', false)

    if (response.status === UNPROCESSABLE_ENTITY){
      context.commit('setErrorLoginMessage', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },
  async logout (context, data) {
    const response = await axios.post('/api/logout', data)
    context.commit('setUser', null)
  },
  async currentUser(context){
    const response = await axios.get('/api/user')
    const user = response.data || null
    context.commit('setUser', user)
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}