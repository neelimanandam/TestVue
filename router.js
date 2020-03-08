import VueRouter from 'vue-router';
// import components
import Login from './components/Login'
import Home from './components/Home'

// routes array
 const routes = [
   { path: '/home', component: Home },
   { path: '/', component: Login }
 ]

 // initializing vue-router instance
const router = new VueRouter({
  routes
})

 export {
   router
 }