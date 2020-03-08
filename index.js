// import vue libraries
import Vue from 'vue';
import VueRouter from 'vue-router';
import { router } from './router';
import Vue from 'vue'
import vuetify from './vuetify'
import store from './store'
import { mdiLogout } from '@mdi/js'

//to use vueRouter library we have to tell Vue
Vue.use(VueRouter);

// initializing new vue instance
const vue = new Vue({
  el: '#app',
  data: {
    logoutIcon: mdiLogout
  },
  methods: {
    logout() {
      this.$store.commit('logout')
      this.$router.push("/")
    }
  },
  router,
  vuetify,
  store
 });