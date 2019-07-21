<template>
  <div>
     <span class="follow" @click="isFollow" :class="{ 'active-follow' : followOrUnfollow === true }">フォロー</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['userId'],
  
  data() {
    return {
      followOrUnfollow: false,
    }
  },
  methods: {
   async feachFollow(){
       //await this.$store.dispatch('post/isFollow', this.userId)
      const res = await axios.get('/api/follows/' + this.userId)
      this.followOrUnfollow = res.data[0]
      },
    isFollow() {
        if(!this.$store.getters['auth/check']){
         alert('ログインしてください')
         this.$router.push('/login')
         return
        }
        if(this.followOrUnfollow === false){
          this.followOrUnfollow = true
          this.$store.dispatch('follow/follow', this.userId)
        } else{
          this.followOrUnfollow = false
          this.$store.dispatch('follow/unfollow', this.userId)
        }
      },
  },
  created() {
      this.feachFollow()
    }
}
</script>

