<template>
  <div class="contents">
    <form action="" class="form" @submit.prevent="updata">
        <input type="text" v-model="postFrom.title" name="title">
        <textarea type="text" v-model="postFrom.body" class="textarea" name="body"></textarea>
        <input type="submit" value="編集" class="btn left-btn_position bg_btn1">
        <span @click.prevent="del" class="btn right-btn_position2 bg_btn3">削除</span>
      </form>
  </div>
</template>
<script>
export default {
  created() { 
    this.edit();
  },
  data() {
    return {
       id: '',
       postFrom: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    async edit() {
      this.id = this.$route.params.id
      const res = await axios.get('/api/posts/' + this.id)
      const post = res.data
      this.postFrom.title = post.title
      this.postFrom.body = post.body
    },
    async updata(){
      await axios.put('/api/posts/' + this.id, this.postFrom)
      this.$router.push('/')

    },
    async del() {
      alert("削除してもよろしいですか？");
      await this.$store.dispatch('post/post_del', this.id)
      this.$router.push('/')
    }
  }
}
</script>

