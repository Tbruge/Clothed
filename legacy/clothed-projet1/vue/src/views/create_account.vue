
<template>

  <div class="container">
    <div class="row">
      <div class="col-md-4 text-right"> 
        <div class = "d-flex justify-content-end">
            <Button @button-click = "retour" class="btn-custom3 mt-4" buttonClass="logging-account-btn "> Retour </Button>
        </div> 
      </div>
      <div class="col-md-4 col-md-offset-4" > 
        <img class="img-fluid header1-img" src="@/assets/cl-logo.png" alt="logo de l'application clothed"> 
      </div>
    </div>
  </div>


    <div>
      <h2 class="title">Remplissez vos informations pour effectuer la création de votre compte</h2>

      <!-- appelle du formulaire pour la creation du compte -->
      <Cform />


      <!-- Le contenu de votre nouvelle page -->
    </div>
  </template>
  
  <script>
  import Button from '@/components/bouton.vue'
  import Cform from '@/components/CreateAccountForm.vue'

  
  export default {
    name: 'CreatingAccount', 
    components: {
      Button,
      Cform
    },
    methods: {
      retour(){
      this.$router.push({name:'Home'});

    }
    }
  }
  </script>
  
  <style >
  .title{
    margin-bottom: 4%;
  }
  /* Styles spécifiques à NouvellePage.vue peuvent être ajoutés ici */
  </style>
  