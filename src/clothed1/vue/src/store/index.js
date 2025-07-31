import  { createStore } from 'vuex'
import state from './state'
import * as actions from './action'
import * as mutations from './mutations'

const store = createStore({
    state,
    actions,
    mutations,
})

export default store;