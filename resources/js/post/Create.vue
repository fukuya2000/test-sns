<template>
  <div class="contents">
    <h2>新規投稿ページ</h2>
    <div v-if="!isLogin">
      <h2>ログインしてください</h2>
    </div>
    <div v-else>
       <form action="" class="form" @submit.prevent="create">
         <ul v-if="createErr">
           <li v-for="msg in createErr" :key="msg">{{ msg }}</li>
         </ul>
        <input type="text" v-model="postForm.title" placeholder="Title">
        <textarea type="text" v-model="postForm.body" placeholder="Body" class="textarea"></textarea>
        <input type="submit" value="投稿" class="btn btn_position bg_btn1">
      </form>
    </div>
   
  </div>
</template>
<script>
export default {
  computed: {
      isLogin (){
        return this.$store.getters['auth/check']
      },
      createErr(){
      return this.$store.state.create.createErrorMessage
    }
  },
  data() {
    return {
      postForm: {
        title: '',
        body: '',
        user_id: '',
      },
      err: {

      }
    }
  },
  methods: {
   async create() {
     this.postForm.user_id = this.$store.getters['auth/user_id']
     await this.$store.dispatch('create/create', this.postForm)
    }, 
    crearError() {
      this.$store.commit('create/setCreateErrorMessage', null)
    }
  },
  created() {
    this.crearError()
  }
}
</script>
