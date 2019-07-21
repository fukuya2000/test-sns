
const state = {
  followPost: [],
  followerName: null,
  orFollow: null,
  popularUsers: null,
  profile: null,
  profilePosts: []
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
  },
  setProfile(state, data) {
    state.profile = data[0]
    state.profilePosts = data[1]
  }
}

const actions = {
  index(context, page){
    axios.get('/api/follows?page=' + page).then(res => context.commit('setFollowList', res.data))
  },
  follow(context, id) {
    axios.put('/api/follows/' + id).then(res => context.commit('setFollowList',  res.data))
   },
   unfollow(context, id) {
    axios.delete('/api/follows/' + id).then(res => context.commit('setFollowList',  res.data))
   },
   popular_users(context){
    axios.get('/api/trend/user').then(res => context.commit('setPopularUsers', res.data))
   },
   profileIndex(context, id) {
    axios.get('/api/profile/' + id).then(res => context.commit('setProfile', res.data))
   }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}