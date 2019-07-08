const state = {
  posts: null
}

const mutations = {
  setPosts(state, data){
    state.posts = data
  }
}

const actions = {
  async index(context) {
   const res = await axios.get('/api/posts')
   context.commit('setPosts', res.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}