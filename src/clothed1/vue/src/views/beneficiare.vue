<template>
    <!-- Affiche le nom de la personne -->
    <div>
      {{ personName }}
    </div>
<!-- Section fixe en haut de la page -->
<div class="fixed-section">
     <!-- Barre de navigation -->
    <div class="bg-gray min-vh-10 ">
        <header class="bg-white shadow-lg py-2 px-4">
            <!-- Bouton de redirection vers la recherche par nom -->
            <div class="align-items-center gap-1">
                <router-link :to= "{name: 'byname'}" class="btn btn-recommencer flex-grow-1 px-2 h-100">Recherche Article par le nom </router-link>
            </div>
        </header>
    </div>

     <!-- Boutons de filtrage par catégorie -->
    <div >
        <div class="d-flex flex-wrap justify-content-center">
            <button @click="SortByCategory('Vêtement')" active-class="active" class="btn router-link btn-group" > Vêtement </button>
            <button @click="SortByCategory('Article_scolaire')" active-class="active" class="btn router-link btn-group" > Article_scolaire </button>
            <button @click="SortByCategory('Electroménager')" active-class="active" class="btn router-link btn-group" > Electroménager </button>
            <button @click="SortByCategory('Autre')" active-class="active" class="btn router-link btn-group" > Autre </button>
        </div>
  </div>
</div>


<!-- Section scrollable -->
  <div class="scrollable-section">
    <div class="container ">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-12 col-md-4 " v-for="article in articles" :key="article.id">
                        <router-link :to="{name: 'articleDetails', params : {id: article.id } }">
                        <div class="image-container">  
                            <img :src="article.url" class="img-fluid mb-4" :alt="article.name">
                         </div>
                        </router-link>
                        <div class="gx-4">
                            <p>{{ article.name }}</p>
                            <div >
                                <div v-if = "!isNameVisible"  class="margin-bottom: 5px; ">
                                <button class="btn btn-recommencer"  @click="getNameByID(article.id)">Révéler le nom</button>
                                </div>
                                <div v-if="isNameVisible">
                                    <p> Auteur :  {{ nameImage.nom }} {{ nameImage.prenom }}</p>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div v-if="errorMessage" class="alert alert-danger">
  {{ errorMessage }}
</div>

</template>

<script>
import { onMounted, ref, computed } from 'vue'; // Importe les fonctionnalités nécessaires de Vue
import Button from '@/components/bouton.vue'; 
import { useRouter } from 'vue-router';
import axiosClient from '../components/axiosClient'; // Importe le client Axios pour effectuer des requêtes HTTP
import { useStore } from 'vuex'; // Importe la fonction useStore de Vuex pour accéder au store global

export default {
    name: 'Beneficiare', // Définit le nom du composant
    components: {
        Button, // Enregistre le composant de bouton
    },
    setup() { 

        const articles = ref([]); 
        const store = useStore(); 
        const personName = computed(() => store.state.userData?.name); 
        const personEmail = computed(() => store.state.userData?.email); 
        const nameImage = ref(' '); // Crée une référence réactive pour stocker le nom de l'image
        const isNameVisible = ref(false); // Crée une référence réactive pour suivre la visibilité du nom de l'image
        const router = useRouter();
        const errorMessage = ref(null);

        // Fonction asynchrone pour filtrer les articles par catégorie
        const SortByCategory = async (category) => {
            try {
                if (!category) {
                    errorMessage.value = 'aucun article disponible.';
                    return;
                }
                const response = await axiosClient.get(`/image/${category}`); 
                if (response.data.length === 0) {
                    errorMessage.value = 'aucun article pour cette categorie.';
                    return;
                }
                articles.value = response.data; // Met à jour la liste des articles avec la réponse de la requête
                errorMessage.value = null;
            } catch (error) {
                errorMessage.value = 'Erreur lors de la récuperation de l article : ' + error.message;
            }
        }

        // Fonction asynchrone pour obtenir le nom de l'auteur en fonction de l'ID de l'image
        const getNameByID = async (id) => {
            try {

                if (!id) {
                    errorMessage.value = 'récupération du nom impossible.';
                    return;
                }
                const response = await axiosClient.get(`/image/search/person/${id}`); 

                if (!response.data || response.data.length === 0) {
                    errorMessage.value = 'Aucun article trouvé';
                    return;
                }

                nameImage.value = response.data[0]; 
                isNameVisible.value = true; // Rend le nom de l'image visible

                // Réinitialise isNameVisible après l'affichage du nom de l'auteur
                setTimeout(() => {
                    isNameVisible.value = false; // Réinitialise la visibilité du nom de l'image après un délai
                }, 5000); // Réinitialise après 5 secondes (ajustez selon vos besoins)
                errorMessage.value = null;

            } catch (error) {
                errorMessage.value = 'Erreur lors de la recherche du nom: ' + error.message; // Affiche une erreur s'il y a un problème lors de la récupération du nom de l'auteur
            }
        }

        // Hook de cycle de vie qui s'exécute après le montage du composant
        onMounted(async () => {
            try {
                const response = await axiosClient.get('/images'); 

                if (!response.data) {
                    throw new Error('Failed to fetch articles. Data is undefined.');
                }

                articles.value = response.data; 
            } catch (error) {
                errorMessage.value = 'récupération impossible: ' + error.message;
            }
        })

        // Retourne les valeurs et les fonctions à utiliser dans le template
        return {
            articles,
            SortByCategory,
            personName,
            personEmail,
            getNameByID,
            nameImage,
            isNameVisible,
            errorMessage
        };
    }
}
</script>


<style > 
.img-fluid {
    width: 250px; /* Largeur fixe */
    height: 250px; /* Hauteur fixe */
    object-fit: cover; 
}
.router-link {
    text-decoration: none ;
    color: white;
    background-color: cadetblue;
    border-radius: 20px;
    border-bottom: 15px;
    margin-top: 10px;
    margin-bottom: 30px;
    padding:23px 0px;
    font-size: 20px ;
    transition: transform 0.5s;
    
}

.router-link:hover,
.router-link:active {
  transform: scale(1.1); /* Agrandit le bouton de 10% lors du survol ou de l'activation */
}

.router-link.active {
  background-color: rgb(9, 153, 64); 
  color: white; 
}

.router-link.active {
    position: relative;
    background-color: rgb(9, 238, 135);
    color: black;
    font-weight: 600;
    margin-left: 2px;
    padding:26px 12px;
    margin-right: 1px;   
}

.fixed-section {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: white;

}

.btn-group{
    display: flex;
    justify-content: center;
    width: 150px
}

.scrollable-section {
    padding-top: 50px; 
}

.image-container {
    position: relative ;
    overflow: hidden ;
}

.image-container img {
    transition: transform 0.3s ease;
}

.image-container:hover img {
    transform: scale(1.1); 
}
    
</style>