<template>
  <!-- Conteneur principal pour le profil -->
  <div class="profile">
    <div class="profile-info">
      <div class="profile-details">
        <!-- Affichage des informations du profil -->
        <p> nom : {{ personName }}</p>
        <p>Email: {{ personEmail }}</p>
        <p>prenom: {{ personPrenom }}</p>
        <!-- Bouton pour activer le mode d'édition -->


        <!-- <button @click="editMode = true" class="btn btn-primary">Modifier</button> -->


        <!-- Formulaire d'édition affiché uniquement en mode édition -->
        <div v-if="editMode">
          <input v-model="editedUserData.name" class="form-control" placeholder="nom" type="text" />
          <input v-model="editedUserData.mot_de_passe" class="form-control" placeholder="mot de passe" type="password" />
          <input v-model="editedUserData.prenom" class="form-control" placeholder="prenom" type="text" />
          <!-- Bouton pour enregistrer les modifications -->
          <button @click="saveChanges" class="btn btn-primary">Enregistrer</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Affichage du prénom édité -->
  <p>{{ editedUserData.prenom }}</p>
</template>

<script>

import {useStore} from 'vuex';
import {computed , reactive , ref} from 'vue';
import axiosClient from '@/components/axiosClient';
import {modifyRest } from "../messaging/authPage/apis"
import { personEmail , personId , personMdp , personName , personPrenom } from '@/components/fonction';
    export default {

      setup(){
        const store = useStore();

         // Récupération des données utilisateur depuis le store
        const userData = computed(() => store.state.userData);
        // const id = computed(() => store.state.userData?.id );
        const userDataMessage = computed(() => store.state.userDataMessage);


        const editedUserData = reactive({ 
          name:"",
          mot_de_passe:"",
          prenom:""
        });
        const editMode = ref(false);

        // const updateMessage = async () => { 
        //     try {
        //         const response = await modifyRest(personName.value, personMdp.value, personPrenom.value ) ;

        //     }catch(error) {
        //         console.log("impossible de motifier vos donner",error) ;
        //     }
        // }

          // Fonction pour enregistrer les modifications du profil
        const saveChanges = async () => {
          try {
            const response = await axiosClient.put(`/update/${personId.value}`,editedUserData);

               // Mise à jour des données utilisateur dans le store Vuex
            store.commit('setUserData', response.data)
            console.log("Données modifiées :", response.data) ;
            editMode.value = false ;

            // updateMessage();

          }catch(error) {
            console.log("Errreur lors de la mise a jours des données",error) ;
          }
      
    };

    return {
         personName,
         personEmail,
         personPrenom,
         personMdp,
         editedUserData,
         editMode,
         saveChanges
      };

      }
    }

    
        
</script>

<style scoped>

.profile {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 40px;
    color: rgb(36, 34, 34);
    font-weight: 600;
}

.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-info {
  display: flex;
  align-items: center;
}

.profile-details h2 {
  margin-bottom: 10px;
}

.edit-profile-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-profile-btn:hover {
  background-color: #0056b3;
}

</style>