
<template>
  <div class="custom_app">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <p @click="authCheck"><router-link to="/list" >---->フォローした人だけ観る</router-link></p>
        <v-layout v-for="(post, key) in getPost" :key="key" class="card-wrap" justify-center >
        <v-card class="custom_card parent">
            <div v-if="userId === post.user_id">
              <span class="edit">
                <router-link :to="'/posts/' + post.id">Edit</router-link>
              </span>
            </div>
            <div v-else>
              <Follow :userId="post.user_id"/>
            </div>
          <v-card-title class="py-1 post_name"><router-link :to="'/profile/' + post.user_id">{{ post.user.name }}</router-link></v-card-title>
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
            <div v-for="(comment, key) in comments" :key="key">
              <span v-if="post.id === comment.post_id">
                <div class="parent comments">
                  <p class="comment_name">{{ comment.user.name }}</p>
                  <p class="comment_content">{{ comment.comments }}</p>
                  <span v-show="userId === comment.user_id">
                    <span @click="comment_edit(comment.id)" class="comment_edit">×</span> 
                  </span>
                </div>
              </span>
            </div>
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
    <ul class="pagination">
          <li @click="change(1)">&laquo;</li>
          <li  @click="change(current_page - 1)">&lt;</li>
          <li v-for="page in pages" :key="page" :class="{'current_page': page === current_page}" @click="change(page)">
             {{page}}
          </li>
          <li @click="change(current_page + 1)">&gt;</li>
          <li @click="change(last_page)">&raquo;</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
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
      pages() {
        let start = _.max([this.current_page - 2, 1])
        let end = _.min([start + 5, this.last_page + 1])
        start = _.max([end - 5, 1])
        return _.range(start, end)
      },
      ...mapState({
            comments: state => state.post.comments,
            getPost: state => state.post.posts.data,
            current_page: state => state.post.posts.current_page,
            last_page: state => state.post.posts.last_page,
            total: state => state.post.posts.total,
            from: state => state.post.posts.from,
            to: state => state.post.posts.to,
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
       this.$store.dispatch('post/index')
      },
      authCheck() {
        if(!this.$store.getters['auth/check']){
         alert('ログインしてください')
         this.$router.push('/login')
        }
      },
      del() {
        this.dialog = false
      },
      getPostId(id) {
        this.postId = id
        this.authCheck()
      },
      async comment_edit(commentId){
        let id = commentId
        await this.$store.dispatch('post/del', id)
      },
      getPagination(page) {
        this.$store.dispatch('post/index', page)
      },
       change(page) {
        if (page >= 1 && page <= this.last_page){
          this.getPagination(page)
        } 
      }
    },
     mounted() {
      this.getPagination(1)
    },
    created() {
      this.fetchPost()
    }
  }
</script>