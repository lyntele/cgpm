import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Competitions from '../views/Competitions.vue'
import Users from '../views/Users.vue'
import Eventitem from '../views/EventItem.vue'
import CertCreate from '../views/eventItem/CertCreate.vue'
import CertManage from '../views/eventItem/CertManage.vue'
import CertVisible from '../views/eventItem/CertVisible.vue'
import MatchManage from '../views/eventItem/MatchManage.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', 
      component: Home,
      children: [
        { path: '/competitions', component: Competitions },
        { path: '/users', component: Users },
        { path: '/eventitem',
          component: Eventitem,
          children: [
            { path: '/certcreate', component: CertCreate },
            { path: '/certmanage', component: CertManage },
            { path: '/certvisible', component: CertVisible },
            { path: '/matchmanage', component: MatchManage },
          ]
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path === '/home'){
    if(sessionStorage.getItem('vuex')) {
      next()
    }
  }
  else next()
})

export default router
