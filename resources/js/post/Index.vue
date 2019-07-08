<template>
  <div class="custom_app">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-layout v-for="(post, key) in getPost" :key="key" class="card-wrap" justify-center >
        <v-card class="custom_card parent">
          <div v-show="userId === post.user_id">
            <span class="edit">
             <router-link :to="'/posts/' + post.id">Edit</router-link> 
            </span>
          </div>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{ post.body }}</v-card-text>
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
          @click="getPostId(post.id)"
        >
          Comment
        </v-btn>

        <Like :postId="post.id" />

        <v-expansion-panel>
          <v-expansion-panel-content>
           <template v-slot:header>
             <div>コメント</div>
           </template>
           <div class="box_item">
            <p>UserName</p>
            <ul v-for="(comment, key) in getComments" :key="key">
              <span v-if="post.id === comment.post_id">
                <li class="parent">
                  {{ comment.comments }}
                  <span v-show="userId === comment.user_id">
                    <span @click="comment_edit(comment.id)" class="comment_edit">×</span>
                  </span>
                </li>
              </span>         
            </ul>
           </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        </v-card>
        </v-layout>
      </template>
      <comment 
        @child_del="del"
        @getComment="setComment"
        :postId="postId" />
    </v-dialog>
  </div>
</template>

<script>
 import Comment from './Comment.vue'
 import Like from '../components/Like.vue'
  export default {
    components: {
       Comment,
       Like
    },
    computed: {
      getPost() {
        return this.$store.state.post.posts
      },
      getComments() {
        return this.$store.state.comment.comments
      }
    },
    watch: {
      getComments(val) {
        console.log(val)
      }
    },
    data () {
      return {
        dialog: false,
        comments: [],
        userId: this.$store.getters['auth/user_id'],
        postId: '',
        commentEdit: false,
      }
    },
    methods: {
     async fetchPost() {
       this.$store.dispatch('post/index')
      },
      async fetchComment() {
        //const res = await axios.get('/api/comments')
        //this.comments = res.data
        this.$store.dispatch('comment/index')
      },
      del() {
        this.dialog = false
      },
      getPostId(id) {
        this.postId = id
        if(!this.$store.getters['auth/check']){
         alert('ログインしてください')
         this.$router.push('/login')
        }
      },
      setComment(res) {
        this.comments = res.data
      },
      async comment_edit(commentId,userId){
        let id = commentId
       // const res = await axios.delete('/api/comments/' + id)
        //this.comments = res.data

        await this.$store.dispatch('comment/del', id)
      },
    },
    created() {
      this.fetchPost()
      this.fetchComment()
    }
  }
</script>
