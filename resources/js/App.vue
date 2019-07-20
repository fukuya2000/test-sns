<template>
 <div>
   <header>
     <Nav />
   </header>
   <main>
     <RouterView />
   </main>
   <Footer />
 </div>
</template>
<script>
import Nav from './components/Nav.vue'
import { INTERNAL_SERVER_ERROR } from './util'
export default {
  components: {
    Nav,
  },
  computed: {
    errorCode() {
      return this.$store.state.error.code
    }
  },
  watch: {
    errorCode: {
      handler (val){
        if (val === INTERNAL_SERVER_ERROR) {
          this.$router.push('/500')
        }
      },
      immediate: true
    },
    $route() {
      this.$store.commit('error/setCode', null)
    }
  }
}
</script>
