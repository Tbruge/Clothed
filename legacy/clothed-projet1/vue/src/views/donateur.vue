<template>
    <div>
      <div class="col-md-4 text-right"> 
        <div class="d-flex justify-content-end">
          <Button @button-click="retour" class="btn-custom3 mt-4" buttonClass="logging-account-btn"> Retour </Button>
        </div>
      </div>
  
      <h1 class="text-center mt-3">Importer votre article</h1>
  
      <div class="container1">
        <div class="square mx-auto mb-5">
          <button type="input" class="btn btn-recommencer btn-import-donator w-100" id="donator-btn-import"> Importer votre image </button>
  
          <!-- mt-5 est équivalent à marging-top : 3rem 
             w-100 fait en sorte que le boutont remplis 100% de son espace attribuer dans le bouton
            mx-auto est une classe utilitaire de Bootstrap qui signifie "margin-left: auto; margin-right: auto;"-->
            <div class="mt-4 donateur_form1">
                <form @submit.prevent="submitForm">
                    <div class="mb-3 row">
                        <label for="donatorName" class="col-sm-2 col-form-label"> Nom </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="donatorName" placeholder="Entrez le nom de votre article" required>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="donatorCategory" class="col-sm-2 col-form-label"> Catégorie </label>
                        <div class="col-sm-10">
                            <select class="form-control" id="donatorCategory" required>
                            <option disabled selected> Sélectionnez votre catégorie d'article </option>
                            <option value="Vêtement"> Vêtement </option>
                            <option value="Article scolaire"> Article scolaire </option>
                            <option value="Electroménager"> Electroménager </option>
                            <option value="Autre"> Autre </option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-send-donator w-100" id="donator-btn-send">Envoyer</button>
                </form>
            </div>
  
          <button type="input" class="btn  btn-recommencer btn-restart-donator w-100" id="donator-btn-import">Recommencer</button>
        </div>
      </div>
  
      <div class="d-flex justify-content-center mt-3">
        <Button @button-click="showHomepage" class="btn btn-lg btn-custom4" buttonClass="deconnect-btn">DECONNEXION</Button>
      </div>
    </div>
  </template>
  
  <script>
  import Button from '@/components/bouton.vue'
  
  export default {
    name: 'Donateur',
    components: {
      Button,
    },
    methods: {
      retour() {
        this.$router.push({ name: 'LogAccount' })
      },
      showHomepage() {
        this.$router.push({ name: 'Home' })
      }
    }
  }
  </script>
  
  <style>
  .square {
    max-width: 65vw;
    max-height: 70vh;
    width: 80%;
    padding-bottom: 38%;
    border-radius: 20%;
    position: relative;
    border: 10px solid black;
    margin: auto;
    overflow: hidden;
  }
  
  .donateur_form1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .container1 {
    display: grid;
    place-items: center;
    height: 50vh;
  }
  
  .btn-import-donator,
  .btn-send-donator,
  .btn-restart-donator {
    min-height: 4em;
    min-width: 12em;
  }

  .btn-recommencer{
    background-color:cadetblue;
    border-color:cadetblue;
    color: white;
  }

  </style>
  