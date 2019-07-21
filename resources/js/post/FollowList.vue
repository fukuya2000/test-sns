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
            getFollowerName: state => state.follow.followerName,
            getFollowList: state => state.follow.followPost.data,
            current_page: state => state.follow.followPost.current_page,
            last_page: state => state.follow.followPost.last_page,
            total: state => state.follow.followPost.total,
            from: state => state.follow.followPost.from,
            to: state => state.follow.followPost.to,
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

      getPagination(page) {
        this.$store.dispatch('follow/index', page)
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
