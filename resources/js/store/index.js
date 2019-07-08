import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import error from './error'
import comment from './comment'
import create from './create'
import post from './post'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    error,
    create,
    post,
    comment
  }
})

export default store