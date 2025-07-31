import {createRouter , createWebHistory} from 'vue-router';
import Homeview from "../views/home.vue";
import CreatingAccountViews from "../views/create_account.vue";
import LoggingAccountViews from "../views/logging_account.vue"
import DonatorViews from "../views/donateur.vue"
import ArticleDetails  from "../views/article_details.vue"
import Dashboard from '@/views/Dashboard.vue';



const routes = [
    {
        path: '/',
        name: 'Home',
        component: Homeview 
    },
    {
        path: '/create-account',
        name: 'CreatingAccount',
        component: CreatingAccountViews
    },
    {
        path: '/login-account',
        name: 'LogAccount',
        component: LoggingAccountViews
    },
    {
        path: '/login-account',
        name: 'Donateur',
        component: DonatorViews
    },
    {
        path: '/login-account/beneficiare/sc',
        name: 'DashboardView',
        component: Dashboard,
        children: [
        {
                path: '/login-account/beneficiare',
                name: 'Beneficiare',
                component: () => import(/* webpackChunkName: "Settings" */ '../views/beneficiare.vue')
            },
            {
              path: '/messages',
              name: 'page_chat',
              component: () => import(/* webpackChunkName: "messages" */ '../views/messages.vue')
            },
            {
              path: '/profile',
              component: () => import(/* webpackChunkName: "profile" */ '../views/profile.vue')
            },
            {
              path: '/archive',
              name: 'Archive',
              component: () => import(/* webpackChunkName: "archive" */ '../views/archive.vue')
            },
            {
                path: '/login-account/beneficiare/by-name/:name?',
                name: 'byname',
                component: () => import(/* webpackChunkName: "SearchByName" */ '../views/searchByName.vue')
            }
          ]
    },
    // {
    //     path: '/login-account/beneficiare/article/messages',
    //     name: 'for-chat',
    //     component: Chat
    // },
    {
        path: '/login-account/beneficiare/article/:id',
        name: 'articleDetails',
        component: ArticleDetails , 
        prop: true
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router