<template>
  <div class="custom_app">
    <p>Follow Now</p>
   <ul v-for="(followerName, index) in getFollowerName" :key="index">
     <li>{{ followerName.name }}</li>
   </ul>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-layout v-for="(post, index) in getFollowList" :key="index" class="card-wrap" justify-center >
        <v-card class="custom_card parent">
            <div v-if="userId === post.user_id">
              <span class="edit">
                <router-link :to="'/posts/' + post.id">Edit</router-link>
              </span>
            </div>
            <div v-else>
              <Follow :userId="post.user_id"/>
            </div>
          <v-card-title class="py-1 post_name">{{ post.user.name }}</v-card-title>
          <v-card-text class="py-2">
            <p>{{ post.title }}</p>
            <p>{{ post.body }}</p>
           </v-card-text>
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
            <ul v-for="(comment, key) in comments" :key="key">
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
        :postId="postId" />
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

 import Comment from './Comment.vue'
 import Like from '../components/Like.vue'
 import Follow from '../components/Follow.vue'
  export default {
    components: {
       Comment,
       Like,
       Follow
    },
    computed: {
     
      ...mapState({
            comments: state => state.post.comments,
            getFollowerName: state => state.follow.followerName,
            getFollowList: state => state.follow.followPost
        })
    },
    data () {
      return {
        dialog: false,
        userId: this.$store.getters['auth/user_id'],
        postId: '',
        commentEdit: false,
      }
    },
    methods: {
     async fetchPost() {
       this.$store.dispatch('follow/index')
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
      async comment_edit(commentId,userId){
        let id = commentId
        await this.$store.dispatch('post/del', id)
      },
    },
    created() {
      this.fetchPost()
    }
  }
</script>
