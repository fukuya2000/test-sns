<template>
    <v-footer color="cyan" >
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
</template>
<script>
export default {
  methods: {
   async feachTest(){
      const res = await axios.get('/api/home/')
      console.log(res.data)
    }
  },
  created(){
    this.feachTest()
  }
}
</script>
