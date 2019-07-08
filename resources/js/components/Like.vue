<template>
<span>
  <p @click="toggleLike" class="far fa-heart like" :class="{'unlike': likeOrUnlike === true }">{{ likeCounter }}</p>
</span>
</template>

<script>
export default {
  props: ['postId'],
  created() {
    this.feachLike()
  },
  data() {
    return {
      likeOrUnlike: false,
      likeCounter: 0,
      info:{
        userId: this.$store.getters['auth/user_id'],
      }
    }
  },
  methods: {
    async feachLike() {
     const res = await axios.get('/api/likes/' + this.postId)
     let counter = res.data[0]
     this.likeCounter = counter
     this.likeOrUnlike = res.data[1]
    },
   async toggleLike(){
      if(this.likeOrUnlike === false){
        //いいね
         this.likeOrUnlike = true
         const res = await axios.put('/api/likes/' + this.postId, this.info)
         let counter = res.data
         this.likeCounter = counter   
      } else {
        this.likeOrUnlike = false
        const res = await axios.delete('/api/likes/' + this.postId)
        let counter = res.data
        this.likeCounter = counter  
      }
    },
  }
}
</script>

