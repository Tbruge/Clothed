import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/global.css'
import router from "./router"
import Axios from 'axios'
import store from './store'

Axios.defaults.baseURL = 'http://localhost:3000';

const app = createApp(App)
app.use(router)
app.use(store)


app.mount('#app')
