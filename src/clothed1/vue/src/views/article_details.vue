
<template>
    <div>
        <!-- Bouton de retour -->
        <div class="col-md-4 text-right">
            <div class="d-flex justify-content-end">
                <Button @button-click="retour" class="btn-custom3 mt-4"> Retour </Button>
            </div>
        </div>

        <!-- Affiche les détails de l'article s'il existe -->
        <div v-if="article">
            <div class="article-details">
                <h1 class="font-bold mb-4"> {{ article.name }}</h1>

                <!-- Affiche l'image de l'article -->
                <div>
                    <img :src="article.url" :alt="article.name">
                </div>

                <!-- Conteneur des boutons -->
                <div class="button-container">
                    <!-- Bouton pour contacter le propriétaire de l'article -->
                    <Button class="btn-recommencer" @click="login"> Contacter le propriétaire </Button>
                    <!-- Bouton pour ajouter l'article dans l'archive -->
                    <Button class="btn-recommencer" @click="ajoutArchive"> Ajouter dans l'archive </Button>
                </div>
            </div>
        </div>

        <!-- Message affiché s'il n'y a pas d'article -->
        <div v-else>
            <p>
                Aucun article trouvé
            </p>
        </div>
    </div>

    <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'; // Importe les fonctionnalités nécessaires de Vue
import Button from '@/components/bouton.vue'; 
import { useRouter, useRoute } from 'vue-router'; 
import axiosClient from '../components/axiosClient'; // Importe le client Axios pour effectuer des requêtes HTTP
import { useStore } from 'vuex'; // Importe la fonction useStore de Vuex pour accéder au store global
import { loginRest } from "../messaging/authPage/apis"; 
import { personName, personEmail, personMdp, personPrenom } from '@/components/fonction'; 

export default {
    components: {
        Button, 
    },

    setup() {
        const article = ref({ }); // Crée une référence réactive pour stocker les détails de l'article
        const route = useRoute(); // Obtient les informations de l'itinéraire actuel
        const router = useRouter(); 
        const store = useStore(); // Obtient le store global de Vuex
        const errorMessage = ref('');

        // Fonction de retour à la page précédente
        const retour = () => {
            router.push({ name: 'Beneficiare' });
        };

        // Fonction pour sauvegarder les détails de l'article dans le localStorage
        const saveToLocalStorage = () => {
            if (!article.value || Object.keys(article.value).length === 0) {
                throw new Error('Cannot save empty article details to localStorage.');
            }
            localStorage.setItem('setArticleDetails', JSON.stringify(article.value));
        }

        // Hook de cycle de vie qui s'exécute après le montage du composant
        onMounted(async () => {
            const articleId = route.params.id; // Obtient l'ID de l'article depuis l'URL
            await fetchArticle(articleId); // Appelle la fonction pour récupérer les détails de l'article
        });

        // Fonction de connexion à la messagerie
        const login = async () => { 
            try {
                if (!personName.value || !personMdp.value) {
                    throw new Error('Both username and password are required for login.');
                }
                const response = await loginRest(personName.value, personMdp.value); // Appelle la fonction de connexion à la messagerie
                router.push({name: 'page_chat'}); // Redirige vers la page de chat après la connexion réussie
                store.commit('setUserDataMessage', { // Enregistre les informations de l'utilisateur dans le store global de Vuex
                    name: response.data.userName,
                    email: response.data.email,
                    id: response.data.id
                })
            } catch(error) {
                console.log("impossible de se connecter a votre messsagerie", error); // Affiche une erreur en cas d'échec de connexion
            }
        }

        // Fonction pour récupérer les détails de l'article par son ID
        const fetchArticle = async (articleId) => {
            if (!articleId) {
                errorMessage.value = 'Id du composant est introuvable .';
                return;
            }
            try {
                const response = await axiosClient.get(`/image/search/${articleId}`); 
                if (!response.data || response.data.length === 0) {
                    errorMessage.value = 'aucun composant trouver.';
                    return;
                }
                article.value = response.data[0]; // Met à jour les détails de l'article avec la réponse de la requête
                store.commit('setArticleDetail', { article }); // Enregistre les détails de l'article dans le store global de Vuex
            } catch (error) {
                errorMessage.value = 'Error fetching article by id: ' + error.message; // Affiche une erreur s'il y a un problème lors de la récupération des détails de l'article
            }
        };

        // Fonction pour ajouter l'article dans l'archive
        const ajoutArchive = async () => {
            if (!store.state.articleDetail || Object.keys(store.state.articleDetail).length === 0) {
                throw new Error('Aucun article disponible.');
            }
            saveToLocalStorage();
            router.push({ name: "Archive" });
        }

        return {
            retour,
            article,
            personEmail,
            personName,
            personPrenom,
            personMdp,
            login,
            ajoutArchive,
            errorMessage
        };
    }
}
</script>

<style scoped>
.article-details {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.image-container {
  border: 5px solid #007bff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.button-container {
  margin-top: 50px;
}

</style>