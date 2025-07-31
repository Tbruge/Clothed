<template>
    <!-- Conteneur du formulaire de connexion -->
    <div class="form-container">
      <!-- Titre de bienvenue avec le nom de la personne connectée -->
      <h1>Bienvenue {{ personName }}!</h1>
  
      <!-- Question sur le mode de connexion préféré -->
      <div>
        <button class="btn-lg btn_custom4">Quel mode de connexion préférez-vous utiliser aujourd’hui ?</button>
      </div>
      
      <!-- Boutons pour choisir entre bénéficiaire et donateur -->
      <div class="d-flex justify-content-end">
        <Button @button-click="showBeneficiary" class="btn btn-lg btn_custom5 flex-grow-1">BENEFICIARE</Button>
        <Button @button-click="showDonator" class="btn btn-lg btn_custom5 flex-grow-1">DONATEUR</Button>
      </div>
  
      <!-- Bouton de déconnexion -->
      <div class="d-flex">
        <Button @button-click="showHomepage" class="btn btn-lg btn-custom4">DECONNECTION</Button>
      </div>
    </div>
  </template>
  
  <script>
  import Button from '@/components/bouton.vue';
  import { useRouter } from 'vue-router';
  import { personName } from '@/components/fonction.js';
  
  export default {
    name: 'LogAccount', // Nom du composant
    components: {
      Button,
    },
    setup() {
      const router = useRouter(); // Accès au routeur de l'application
  
      // Méthode pour afficher la page du donateur
      const showDonator = () => {
        router.push({ name: 'Donateur' });
      };
  
      // Méthode pour afficher la page du bénéficiaire
      const showBeneficiary = () => {
        router.push({ name: 'Beneficiare' });
      };
  
      // Méthode pour revenir à la page d'accueil et déconnecter l'utilisateur
      const showHomepage = () => {
        // Supprimer les données stockées dans le localStorage
        localStorage.removeItem('setArticleDetails');         
        localStorage.removeItem('userData');
        
        router.push({ name: 'Home' });
      };
  
      return {
        showHomepage,
        showBeneficiary,
        showDonator,
        personName,
      };
    }
  }
  </script>

<style>
.btn_custom4{
    background-color: #66635c;
    border-color: #645e56;
    width:50%;
    min-height: 50px;
    border-radius: 10%;
    color: #fff;
    margin: 10px ;
    margin-top: 5%;
    margin-bottom: 3%;
    font-size: 20px;
}

.btn_custom5{
    background-color:cadetblue;
    border-color:cadetblue;
    color: #fff;
    margin: 10px ;
    margin-top: 3%;
    margin-bottom: 3%;
    min-height: 250px;
}
</style>