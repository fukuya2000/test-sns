import {  UNPROCESSABLE_ENTITY } from '../util'

const state = {
  createErrorMessage: null
}

const mutations = {
  setCreateErrorMessage(state,message){
    state.createErrorMessage = message
  }
}

const actions = {
  async create(context, data) {
   const res = await axios.post('/api/posts', data).catch(err => err.response || err)

    if(res.status === UNPROCESSABLE_ENTITY){
      context.commit('setCreateErrorMessage', res.data.errors)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}