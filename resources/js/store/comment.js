
const state = {
  comments: null
}

const getters = {
  getComments(state) {
    return state.comments
  }
}

const mutations = {
 setComments(state, data){
   state.comments = data
 }
}

const actions = {
  async index(context){
    const res = await axios.get('/api/comments')
    context.commit('setComments', res.data)
  },
  async del(context, id) {
    const res = await axios.delete('/api/comments/' + id)
    context.commit('setComments', res.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}