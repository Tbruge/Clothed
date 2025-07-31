<template>

<div class="col-md-4 text-right"> 
        <div class = "d-flex justify-content-end">
            <Button @button-click = "retour" class="btn-custom3 mt-4"> Retour </Button>
        </div> 
    </div>


    <h1 class="d-flex justify-content-center"> Mes images </h1>

    <!-- Current Images Section -->
    <div class = "container">
        <div class = "row">
            <div class= "col-12">
                <div class = "row">
                    <div class = "col-12 col-md-4" v-for="article in articles" :key="article.id"> 
                        <div class="image-container">  
                            <img :src="article.url" class="img-fluid mb-4" :alt="article.name">
                        </div>
                        <div class="gx-4">
                            <p>{{ article.name }} </p>
                        </div>
                        <div>
                            <button @click="deleteImage(article.id)" class = "btn btn-recommencer"> supprimer </button>
                            <button @click="showUpdateForm(article.id)" class = "btn btn-recommencer"> modifier </button>
                        </div> 

                        <div v-if="showUpdate && selectedArticleId === article.id">
                            <label for="name"> Nom: </label>
                                <input type="text" id="name" v-model="updatedName">
                            <button @click="updateImage(article.id)" class ="btn btn-primary"> Enregistrer </button>
                        </div>
                    
                    </div>
                </div>
            </div>

        </div>
    </div>


    <h1> Images enregistrer </h1>

    {{ articlesArchive.name }}

    <!-- Archived Images Section -->
    <div class="container ">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-12 col-md-4 " v-for="article in articlesArchive" :key="article.id">
                        <div class="image-container">  
                            <img :src="article.url" class="img-fluid mb-4" :alt="article.name">
                         </div>
                        <div class="gx-4">
                            <p>{{ article.name }}</p>
                        </div>
                        <div class="gx-4">
                            <button @click="deleteImageArchive(article.id)" class = "btn btn-recommencer"> supprimer </button>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>

     <!-- Error Message Display -->
    <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
    </div>


</template>

<script>
import {ref , onMounted} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
import axiosClient from '../components/axiosClient';
import Button from '@/components/bouton.vue'
import { personName , personEmail } from '@/components/fonction';


    export default {
        components:{
            Button
        },
        setup(){
            const store = useStore();
            const articles = ref ([ ]);
            const articlesArchive = ref ([ ]);
            const router = useRouter();
            const errorMessage = ref(''); 

            const showUpdate = ref(false);
            const selectedArticleId = ref(null);
            const updatedName = ref('');

            const retour = () => {
                router.push({name : 'Beneficiare' })
            }


            const searchItems = async (email) => {
                try {
                    const response = await axiosClient.get(`/image/searche/${email}`)
                    articles.value = response.data 
                }catch(error) {
                    errorMessage.value = "Error fetching articles: " + error.message;
                }

            };

            const deleteImage = async (id) => {
                try {

                   const response =  await axiosClient.delete(`/image/delete/${id}`)
                   console.log("Image deleted seccussfully",response.data)

                   articles.value = articles.value.filter(article => article.id !== id);

                }catch(error) {
                    errorMessage.value = "Erreur lors de la suppresion: " + error.message;
                }
            };

            const showUpdateForm = (id) => {
                // Assertion to check if the Id is valid
                if (!id) {
                errorMessage.value = "impossible de mettre à jour.";
                return;
            }

                selectedArticleId.value = id;
                showUpdate.value = true;
            }

            const updateImage = async (id) => {
                 // Assertion to check if the updated name is not empty
                if (!updatedName.value.trim()) {
                errorMessage.value = "le nom ne doit pas être vide";
                return;
            }
                try{


                    const newData = {
                        name : updatedName.value
                    }

                    const response = await axiosClient.put(`/image/update/${id}`,newData)
                    console.log("Image updated successfully", response.data);
                }catch(error){
                    console.log("Error updating image:", error);
                }finally {
                    selectedArticleId.value = null;
                    showUpdate.value = false;
                    updatedName.value = '';
                }

            };

            const deleteImageArchive = async ( id) => {

                try {
                    
                    localStorage.removeItem(`article_${id}`);

                    articlesArchive.value = articlesArchive.value.filter(article => article.id !== id);
                    console.log("la suppresion à été un success.");

                }catch(error) {
                    errorMessage.value = "Erreur lors de la suppresion: " + error.message;
                }
                


            }

            onMounted (() => {
                for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                console.log("la clé est ",key)
                if (key  === 'setArticleDetails'){
                    const article = JSON.parse(localStorage.getItem(key));
                    articlesArchive.value.push(article);
                }
            }
                 searchItems(personEmail.value);
             });

            return {
                retour ,
                articles ,
                searchItems,
                personEmail,
                personName,
                deleteImage,
                showUpdate,
                showUpdateForm,
                updatedName,
                updateImage,
                selectedArticleId,
                articlesArchive,
                deleteImageArchive,
                errorMessage
            };

        }
      
    }
</script>

<style scoped>

</style>