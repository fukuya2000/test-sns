<template>
<span>
  <p @click="toggleLike" class="far fa-heart like" :class="{'unlike': likeOrUnlike === true }">{{ likeCounter }}</p>
</span>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: ['postId'],
  computed: {
    ...mapState({
      getCounter: state => state.post.counter,
      //getLike: state => state.post.check
    }),
    ...mapGetters({
      counter: 'post/getLikes'
    }) 
  },
  created() {
    this.feachLike()
  },
  data() {
    return {
      likeOrUnlike: false,
      likeCounter: 0,
    }
  },
  methods: {
    async feachLike() {
     const res = await axios.get('/api/likes/' + this.postId)
     this.likeOrUnlike = res.data[1]
     this.likeCounter = res.data[0]
      //await this.$store.dispatch('post/like_index', this.postId)


    },
   async toggleLike(){
      if(!this.$store.getters['auth/check']){
         alert('ログインしてください')
         this.$router.push('/login')
         return
      }else {
        if(this.likeOrUnlike === false){
          //いいね
           this.likeOrUnlike = true
           const res = await axios.put('/api/likes/' + this.postId)
            this.likeCounter = res.data
          // await this.$store.dispatch('post/like', this.postId)

          
        } else {
          //いいね解除
          this.likeOrUnlike = false
           const res = await axios.delete('/api/likes/' + this.postId)
           this.likeCounter = res.data
          //await this.$store.dispatch('post/unlike', this.postId)
        }
      }
    },
  }
}
</script>

