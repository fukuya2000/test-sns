<template>
<div>
    <v-navigation-drawer 
      id="app-drawer"
      v-model="drawer" 
      fixed
      
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
               <router-link to="/">Home</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!this.$store.getters['auth/check']">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/login">Login/Register</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
         <v-list-tile v-else>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click.prevent="logout">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
               <router-link to="/create">Create</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
               <router-link to="/trend">Trend</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan" dark fixed app height="70px" extension-height="70px" class="custom-toolbar">
      <v-toolbar-title><router-link to="/">SNS</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="this.$store.getters['auth/check']">{{  this.$store.getters['auth/username'] }}</v-toolbar-title>
      <v-toolbar-title v-else>
        <router-link to="/login" class="white_link">Login/Register</router-link>
      </v-toolbar-title>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
</div>
</template>

<script>
  import { mapState ,mapGetters} from 'vuex'

  export default {
    
    data: () => ({
      drawer: null,
      
    }),
    props: {
      source: String
    },
    methods: {
     async logout() {
       await this.$store.dispatch('auth/logout')
       this.check = false
       this.username = ''
       this.$router.push('/login')
      }
    }
  }
</script>