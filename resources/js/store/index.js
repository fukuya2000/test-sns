import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import error from './error'
import post from './post'
import follow from './follow'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    error,
    post,
    follow
  }
})

export default store