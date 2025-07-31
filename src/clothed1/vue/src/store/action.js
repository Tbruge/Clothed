import axiosClient from '../components/axiosClient';

// récuperer une image pour être afficher dans archive
export function uniqueArticleDetail({commit}, detail) {
    commit('setArticleDetail' , detail )

}