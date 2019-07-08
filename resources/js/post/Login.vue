<template>
  <div class="contents"> 
    <div class="center">
      <span class="select-form" @click="tab = 1" :class="{ 'select-form__active': tab === 1 }">Login</span>
      <span class="select-form" @click="tab = 2" :class="{ 'select-form__active': tab === 2 }">Register</span>
    </div> 
    <div class="login" v-show="tab === 1">
      <form action="" class="form" @submit.prevent="login">
        <div v-if="loginErrors">
          <ul v-if="loginErrors.email">
            <li v-for="msg in loginErrors.email" :key="msg">
              {{ msg }}
            </li>
          </ul>
          <ul v-if="loginErrors.password">
            <li v-for="msg in loginErrors.password" :key="msg">
              {{ msg }}
            </li>
          </ul>
        </div>
        <input type="text" v-model="loginForm.email" placeholder="Email">
        <input type="password" v-model="loginForm.password" placeholder="Password"> 
        <input type="submit" value="Login" class="btn btn_position bg_btn1">
      </form>
    </div>
    <div class="register" v-show="tab === 2">
      <form action="" class="form" @submit.prevent="register">
        <div v-if="registerErrors">
          <ul v-if="registerErrors.email">
            <li v-for="msg in registerErrors.email" :key="msg">
              {{ msg }}
            </li>
          </ul>
          <ul v-if="registerErrors.password">
            <li v-for="msg in registerErrors.password" :key="msg">
              {{ msg }}
            </li>
          </ul>
        </div>
        <input type="text" v-model="registerForm.name" placeholder="Username">
        <input type="text" v-model="registerForm.email" placeholder="Email">
        <input type="password" v-model="registerForm.password" placeholder="Password"> 
        <input type="password" v-model="registerForm.password_confirmation" placeholder="password確認">
        <input type="submit" value="Register" class="btn btn_position bg_btn2">
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: 1,
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
   async login(){
      await this.$store.dispatch('auth/login', this.loginForm)
      if(this.apiStatus){
        this.$router.push('/')
      }
    },
    async register () {
      await this.$store.dispatch('auth/register', this.registerForm)
         this.$router.push('/')
    },
    crearError(){
      this.$store.commit('auth/setErrorLoginMessage', null)
    }
  },
  computed: {
    apiStatus (){
      return this.$store.state.auth.apiStatus
    },
    loginErrors (){
      return this.$store.state.auth.loginErrorMessage
    },
    registerErrors (){
      return this.$store.state.auth.registerErrorMessages
    }
  },
  created() {
    this.crearError()
  }
}
</script>
 