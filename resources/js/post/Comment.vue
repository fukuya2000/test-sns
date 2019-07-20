<template>
   <v-card class="parent">
        <v-card-title
          class="headline grey lighten-2 custom_card_title"
          primary-title>
          Comment <span class="delete" @click.prevent="del">×</span>
        </v-card-title>

        <v-card-text>
          <form @submit.prevent="getComment(postId)">
             <textarea class="textarea" v-model="commentForm.content"></textarea>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="dialog = false"
                  type="submit"
                 >
                   Add
                 </v-btn>
               </v-card-actions>
              </form>
       </v-card-text>
   </v-card>
</template>

<script>
export default {
  props: ['postId'],
  data() {
    return {
      commentForm: {
        content: '',
        post_id: '',
        user_id: '',
      },
      comments: [],
    }
  },
  methods: {
  //$emit親要素（Index)のChild_delイベントを発火
   del() {
     this.$emit('child_del')
   },
  async getComment(id) {
     this.commentForm.post_id = id
     this.commentForm.user_id = this.$store.getters['auth/user_id']
     await this.$store.dispatch('post/create', this.commentForm)
     this.$emit('child_del')
     this.commentForm.content = ''
   }
  }
}
</script>
