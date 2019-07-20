<template>
  <div class="custom_app">
    <div class="flex_center b-margin">
      <p @click="tab = 1" class="trend_select" :class="{ 'trend_select__active' : tab === 1 }">人気なユーザー</p>
      <p @click="tab = 2" class="trend_select" :class="{ 'trend_select__active' : tab === 2 }">いいねの多い投稿</p>
    </div>
    <div v-show="tab === 1">
     <div v-for="(popular_user, index) in getPopularUsers" :key="index">
       <div class="trend_box">
          <p class="trend_user-title">{{ popular_user.name }}</p>
          <p class="trend_user-follow">{{ popular_user.follows_count }}
            <span class="fc_gray fs_12">フォロー中</span>
            {{ popular_user.followers_count }}
            <span class="fc_gray fs_12">フォロワー</span>
          </p>
       </div>
     </div>
    </div>
    <div v-show="tab === 2">
       
         <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-layout v-for="(popular_post, index) in getPopularPosts" :key="index" class="card-wrap" justify-center >
        <v-card class="custom_card parent">
            <div>
              <Follow />
            </div>
          <v-card-title class="py-1 post_name">{{ popular_post.user.name }}</v-card-title>
          <v-card-text class="py-2">
            <p>{{ popular_post.title }}</p>
            <p>{{ popular_post.body }}</p>
           </v-card-text>
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
          
        >
          Comment
        </v-btn>

        <Like  :postId="popular_post.id"/>

        <v-expansion-panel>
          <v-expansion-panel-content>
           <template v-slot:header>
             <div>コメント</div>
           </template>
           <div class="box_item">
            <p>UserName</p>
            <ul>
                <li class="parent">
        
                </li>
            </ul>
           </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        </v-card>
        </v-layout>
      </template>
      <comment @child_del="del"/>
    </v-dialog>

    </div>
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
      getPopularPosts: state => state.post.popularPosts,
      getPopularUsers: state => state.follow.popularUsers
    }),
    },
  data() {
    return {
      tab: 1,
      dialog: false,
    }
  },
  methods: {
     del() {
        this.dialog = false
      },
      feachPost(){
        this.$store.dispatch('follow/popular_users')
        this.$store.dispatch('post/popular_posts')
      }
  },
  created() {
    this.feachPost()
  }
}
</script>

