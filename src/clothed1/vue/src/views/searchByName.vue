<template>
    <!-- Barre de navigation -->
    <div class="bg-gray min-vh-10">
        <header class="bg-white shadow-lg py-2 justify-content-between align-items-stretch">
            <div class="align-items-center gx-4">
                <!-- Bouton pour revenir à la page Beneficiare -->
                <router-link :to="{name: 'Beneficiare'}" class="btn btn-recommencer flex-grow-1 px-2 h-100">Retour à Beneficiare</router-link>
            </div>
        </header>
    </div>

    <!-- Affichage du nom de l'utilisateur -->
    <div>
        {{ personName }}
    </div>

    <!-- Bouton de retour -->
    <div class="col-md-4 text-right"> 
        <div class="d-flex justify-content-end">
            <Button @button-click="retour" class="btn-custom3 mt-4">Retour</Button>
        </div> 
    </div>

    <!-- Barre de recherche -->
    <div class="d-flex flex-column p-4 ">
        <input v-model="keyword" type="text" class="form-control rounded border border-secondary  col-8 mb-4" placeholder="Rechercher un article" />
        <Button @click="searchByName" class="btn btn-recommencer">Rechercher</Button>
    </div>

    <!-- Contenu de la liste d'articles -->
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <!-- Affichage des images des articles -->
                    <div class="col-12 col-md-4" v-for="article in articles" :key="article.id">
                        <router-link :to="{name: 'articleDetails', params: {id: article.id }}">
                            <div class="image-container">
                                <img :src="article.url" class="img-fluid mb-4" :alt="article.name">
                            </div>
                        </router-link>
                        <!-- Affichage des informations de l'article -->
                        <div class="gx-4">
                            <div class="gx-4">
                                <p>{{ article.name }}</p>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="error" class="alert alert-danger">
        {{ error }}
    </div>

</template>

<script>
import { computed, ref } from 'vue'; 
import Button from '@/components/bouton.vue'; 
import axiosClient from '../components/axiosClient'; 
import { useStore } from 'vuex'; // Import du store Vuex pour la gestion de l'état global
import { useRouter } from 'vue-router';

export default {
    components: {
        Button,
    },

    setup() {
        const keyword = ref(''); 
        const articles = ref([]); // Référence pour la liste des articles
        const store = useStore(); // Utilisation du store Vuex
        const personName = computed(() => store.state.userData?.name); 
        const personEmail = computed(() => store.state.userData?.email); 
        const error = ref(null);  // Référence pour stocker les messages d'erreur

        // Fonction pour rechercher des articles par nom
        const searchByName = async () => {
            error.value = null; // Réinitialiser l'erreur avant chaque recherche

            if (!keyword.value.trim()) {
                error.value = 'Le mot-clé de recherche ne peut pas être vide.';
                return;
            }

            try {
                const response = await axiosClient.get(`/images/search/${keyword.value}`); 
                if (!response.data || response.data.length === 0) {
                    error.value = 'Aucun article trouvé avec ce mot-clé.';
                    return;
                }
                articles.value = response.data; // Mise à jour de la liste des articles avec les résultats de la recherche
            } catch (error) {
                error.value = 'Erreur lors de la recherche d\'images par nom: ' + error.message;
            }
        };
        
        // Hook de routage pour la navigation
        const router = useRouter();

        // Fonction de retour à la page précédente
        const retour = () => {
            router.push({ name: 'LogAccount' });
        };

        return {
            articles,
            keyword,
            searchByName,
            personName,
            personEmail,
            retour,
            error 
        };
    }
}
</script>



