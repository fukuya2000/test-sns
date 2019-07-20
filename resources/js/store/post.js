import {  UNPROCESSABLE_ENTITY } from '../util'
const state = {
  posts: [],
  pagination: [],
  comments: null,
  createErrorMessage: null,
  status: null,
  popularPosts: null
}

const getters = {
  getPost(state) {
    return state.posts
  },
  getPagination(state){
    return state.pagination
  }
}

const mutations = {
  setPosts(state, res){
    state.posts = res
  },
  setComments(state, data){
    state.comments = data
  },
  setStatus(state, status){
    state.status = status
  },
  setCreateErrorMessage(state,message){
   state.createErrorMessage = message
  },
  setPopularPost(state, res){
    state.popularPosts = res.data
  }

}



const actions = {
  async index(context, page) {
   axios.get('/api/posts?page=' + page).then(res => context.commit('setPosts', res.data))
   axios.get('/api/comments').then(res => context.commit('setComments', res.data))
  },
  async post_create(context, data) {
     const res = await axios.post('/api/posts', data).catch(err => err.response || err)
 
     if(res.status === UNPROCESSABLE_ENTITY){
       context.commit('setStatus', false)
       context.commit('setCreateErrorMessage', res.data.errors)
     } else {
       context.commit('setStatus', true)
     }

   },
  async post_del(context, id) {
     await axios.delete('/api/posts/' + id)
   },

   popular_posts(context){
    axios.get('/api/trend/post').then(res => context.commit('setPopularPost', res.data))
   },

  //comment
  del(context, id) {
    axios.delete('/api/comments/' + id).then(res => context.commit('setComments', res.data))
  },
  create(context, info){
    axios.post('/api/comments', info).then(res => context.commit('setComments', res.data))
 },

  
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}