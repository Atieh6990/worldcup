import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

import worldCupHome from '../views/worldCupHome.vue'
import chat from '../views/Pm.vue'
// import time from '../views/time.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'worldCupHome',
        component: worldCupHome,
        children: [{path: 'Pm', name: 'chat', component: chat}],
    },
    {
        path: '/worldCupHome',
        name: 'worldCupHome',
        component: worldCupHome,
        children: [{path: 'Pm', name: 'chat', component: chat}],
    },

    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    // // {
    // //   path: '/about',
    // //   name: 'About',
    // //   // route level code-splitting
    // //   // this generates a separate chunk (about.[hash].js) for this route
    // //   // which is lazy-loaded when the route is visited.
    // //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
