<template>
<div>
  <div>
    <ul v-for="(profile, i) in getProfile" :key="i" class="profile">
      <p>{{ profile.name }}</p>
      <p >{{ profile.follows_count }}<span class="fc_gray">フォロー中</span>{{ profile.followers_count }}<span class="fc_gray">フォロワー</span></p>
    </ul>
  </div>
    <div class="custom_app">
    <v-dialog
      v-model="dialog"
      width="500"
    >
    <template v-slot:activator="{ on }">
        <v-layout v-for="(post, key) in getProfilePosts" :key="key" class="card-wrap" justify-center >
        <v-card class="custom_card parent">
            <div v-if="userId === post.user_id">
              <span class="edit">
                <router-link :to="'/posts/' + post.id">Edit</router-link>
              </span>
            </div>
            <div v-else>
              <Follow :userId="post.user_id"/>
            </div>
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
</div>
</template>



<script>
import { mapState } from 'vuex';
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
  data(){
    return {
        dialog: false,
        userId: this.$store.getters['auth/user_id'],
        postId: '',
        commentEdit: false,
    }
  },
  computed: {
    ...mapState({
      getProfile: state => state.follow.profile,
      getProfilePosts: state => state.follow.profilePosts
    }),
  },
  methods: {
   async  fetchFollow() {
      let id = this.$route.params.id
      await this.$store.dispatch('follow/profileIndex', id)
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
  },
  created(){
    this.fetchFollow()
  }
}
</script>

