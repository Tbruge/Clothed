import {createRouter , createWebHistory} from 'vue-router';
import Homeview from "../views/home.vue";
import CreatingAccountViews from "../views/create_account.vue";
import LoggingAccountViews from "../views/logging_account.vue"
import DonatorViews from "../views/donateur.vue"
import BeneficiaryViews from "../views/beneficiare.vue"
import ArticleListViews  from "../components/articleList.vue"
import SearchByNameViews from "../components/searchByName.vue"
import SearchByLetterViews from "../components/searchByLetter.vue"


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
        path: '/login-account/donateur',
        name: 'Donateur',
        component: DonatorViews
    },
    {
        path: '/login-account/beneficiare',
        name: 'Beneficiare',
        component: BeneficiaryViews
    },
    {
        path: '/login-account/beneficiare/by-name/:name?',
        name: 'byname',
        component: SearchByNameViews
    },
    {
        path: '/login-account/beneficiare/by-letter/:letter?',
        name: 'by-letter',
        component: SearchByLetterViews
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router