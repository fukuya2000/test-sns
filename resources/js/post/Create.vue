<template>
  <div class="contents">
    <h2>新規投稿ページ</h2>
    <div v-if="!isLogin">
      <h2>ログインしてください</h2>
    </div>
    <div v-else>
       <form action="" class="form" @submit.prevent="create">
         <ul v-if="createErr">
           <li v-for="(msg, index) in createErr" :key="index">{{ msg }}</li>
         </ul>
        <input type="text" v-model="postForm.title" placeholder="Title">
        <textarea type="text" v-model="postForm.body" placeholder="Body" class="textarea"></textarea>
        <input type="submit" value="投稿" class="btn btn_position bg_btn1">
      </form>
    </div>
   
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
      isLogin (){
        return this.$store.getters['auth/check']
      },
      createErr(){
      return this.$store.state.post.createErrorMessage
     },
      ...mapState({
            status: state => state.post.status
        })
  },
  data() {
    return {
      postForm: {
        title: '',
        body: '',
        user_id: '',
      },
    }
  },
  methods: {
   async create() {
     this.postForm.user_id = this.$store.getters['auth/user_id']
     await this.$store.dispatch('post/post_create', this.postForm)
     if(this.status){
        this.$router.push('/')
     }
    },
     crearError() {
      this.$store.commit('post/setCreateErrorMessage', null)
    }
  },
  created() {
    this.crearError()
  }
}
</script>
