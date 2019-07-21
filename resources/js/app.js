import './bootstrap'
import Vue from 'vue'
import router from './router'
import Axios from 'axios';

import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import App from './App.vue'
import store from './store'

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.base,
    secondary: colors.blue.base,
    accent: colors.amber.base,
  }
});

// Main app
const createApp = async () => {
  await store.dispatch('auth/currentUser')
  new Vue({
    el: '#app',
    router,
    store,
    components: { App }, 
    template: '<App />' 
});
}
createApp()






