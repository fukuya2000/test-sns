
const state = {
  followPost: null,
  followerName: null,
  orFollow: null,
  popularUsers: null
}

const mutations = {
  setFollowList(state, data) {
    state.followPost = data[0]
    state.followerName = data[1]
  },
  setOrFollow(state, data) {
    state.orFollow = data
  },
  setPopularUsers(state, res) {
    state.popularUsers = res.data
  }
}

const actions = {
  index(context){
    axios.get('/api/follow/list').then(res => context.commit('setFollowList', res.data))
  },
  follow(context, id) {
    axios.put('/api/follows/' + id).then(res => context.commit('setFollowList',  res.data))
   },
   unfollow(context, id) {
    axios.delete('/api/follows/' + id).then(res => context.commit('setFollowList',  res.data))
   },
   popular_users(context){
    axios.get('/api/trend/user').then(res => context.commit('setPopularUsers', res.data))
   }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}