<template>
  <!-- Contenu de la page d'accueil -->
  <div>
    <!-- Ajout des logos de l'université -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <img class="img-fluid header-img" src="@/assets/unamur.png" alt="logo de l'université de Namur">
        </div>
      </div>
    </div>

    <!-- Titre de l'application -->
    <h1>CLOTHED</h1>

    <!-- Bouton pour créer un nouveau compte -->
    <div>
      <Button @button-click="showCreateAccount" class="btn-custom2 mt-4">Créer un nouveau compte</Button>
    </div>

    <!-- Formulaire de recherche -->
    <HForm class="mt-4 custom-hform" />

    <!-- Bouton pour se connecter à un compte existant -->
    <!-- <div class="d-flex justify-content-end">
      <Button @button-click="showLoginAccount" class="btn-custom1 mt-4">Connectez-vous à votre compte</Button>
    </div> -->
  </div>
</template>

<script>
import Button from '@/components/bouton.vue';
import HForm from '@/components/HomeForm.vue';
import { useRouter } from "vue-router";
import { ref } from 'vue';

export default {
  name: 'Home', // Nom du composant
  components: {
    Button,
    HForm
  },
  
  setup() {
    const router = useRouter(); // Accès au routeur de l'application
    const status = ref(false); // Référence pour le statut de la page

    // Redirection de la page si le statut est faux
    if (!status) {
      window.location.reload();
      status !== status;
    }

    // Méthode pour afficher la page de création de compte
    const showCreateAccount = () => {
      router.push({ name: 'CreatingAccount' });
    };

    // Méthode pour afficher la page de connexion
    const showLoginAccount = () => {
      router.push({ name: 'LogAccount' });
    };

    return {
      showCreateAccount,
      showLoginAccount,
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.custom-hform{
  width: 100%; 
  height: 70%;
}

.btn-custom1 {
  background-color: #16d83a;
  border-color: rgb(10, 115, 43);
  width: 400px;
  color: #fff;
  border-radius: 20px;
}

.btn-custom2{
  background-color: #FFA500;
  border-color: #c5850e;
  width: 400px;
  color: #fff;
  border-radius: 20px;
  margin-bottom: 5%;
}
</style>
