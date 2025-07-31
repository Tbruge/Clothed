<template>
  <!-- Formulaire de création de compte -->
  <div class="container form-container">
      <div>
          <form @submit.prevent="submitForm" class="form-horizontal">
              <!-- Champ pour le nom -->
              <div class="mb-4 row">
                  <label class="control-label col-sm-2" for="inputNom">Nom:</label>
                  <div class="col-sm-10">
                      <input v-model="formData.nom" class="form-control" id="inputNom" placeholder="Votre Nom" type="text" />
                      <span v-if="errors.nom" class="error">{{ errors.nom }}</span>
                  </div>
              </div>

              <!-- Champ pour le prénom -->
              <div class="mb-4 row">
                  <label class="control-label col-sm-2" for="inputPrenom">Prenom:</label>
                  <div class="col-sm-10">
                      <input v-model="formData.prenom" class="form-control" id="inputPrenom" placeholder="Votre Prenom" type="text" />
                      <span v-if="errors.prenom" class="error">{{ errors.prenom }}</span>
                  </div>
              </div>

              <!-- Champ pour l'email -->
              <div class="mb-4 row">
                  <label class="control-label col-sm-2" for="inputEmail">Email:</label>
                  <div class="col-sm-10">
                      <input v-model="formData.email" class="form-control" id="inputEmail" placeholder="Adresse Email" type="email" />
                      <span v-if="errors.email" class="error">{{ errors.email }}</span>
                  </div>
              </div>

              <!-- Champ pour le mot de passe -->
              <div class="mb-4 row">
                  <label class="control-label col-sm-2" for="inputMotDePasse">Mot de passe:</label>
                  <div class="col-sm-10">
                      <input v-model="formData.mot_de_passe" class="form-control" id="inputMotDePasse" placeholder="Votre mot de passe" type="password" />
                      <span v-if="errors.mot_de_passe" class="error">{{ errors.mot_de_passe }}</span>
                  </div>
              </div>

              <!-- Champ pour la confirmation du mot de passe -->
              <div class="mb-4 row">
                  <label class="control-label col-sm-2" for="inputConfirmationMotDePasse">Confirmation mot de passe:</label>
                  <div class="col-sm-10">
                      <input v-model="formData.confirmation_mot_de_passe" class="form-control" id="inputConfirmationMotDePasse" placeholder="Confirmez votre mot de passe" type="password" />
                      <span v-if="errors.confirmation_mot_de_passe" class="error">{{ errors.confirmation_mot_de_passe }}</span>
                  </div>
              </div>

              <!-- Bouton de soumission -->
              <div class="mb-4 row">
                  <div class="col-sm-offset-2 col-sm-10">
                      <button type="submit" class="btn btn-primary custom_button">Créer votre compte</button>
                  </div>
              </div>
          </form>
      </div>
  </div>
</template>

<script setup>
import axios from 'axios'; // Import de la bibliothèque Axios pour effectuer des requêtes HTTP
import { ref, reactive } from "vue"; // Import des fonctions de Vue.js
import { useRouter } from 'vue-router'; // Import du hook de route Vue Router
import { signupRest } from "../messaging/authPage/apis"; // Import de la fonction pour l'inscription

// Initialisation des variables réactives pour le formulaire et les erreurs
const router = useRouter();
const formData = reactive({
  nom: "",
  email: "",
  prenom: "",
  mot_de_passe: "",
  confirmation_mot_de_passe: "",
});

const errors = reactive({
  nom: "",
  email: "",
  prenom: "",
  mot_de_passe: "",
  confirmation_mot_de_passe: "",
});

// Fonction de soumission du formulaire
const submitForm = () => {
  validateForm();
  if (isValid()) {
      // Requête POST pour créer un compte
      axios.post('http://localhost:3000/api/persons/addPerson',formData)
      .then(response => {
          console.log(response.data);
          if(response.data === "valid") {
              router.push({ path: '/' });
              alert('Compte créé avec succès');
              signup();
          } else {
              alert('Désolé, l\'adresse email est déjà prise');
          }
          console.log("Formulaire soumis :", response.data);
      })
      .catch(error => {
          console.error('Erreur lors de la soumission du formulaire:', error);
      });
  }
};

// Fonction pour l'inscription
const signup = async () => { 
  try {
      const response = await signupRest(formData.nom , formData.mot_de_passe , formData.email , formData.prenom )
  } catch(error) {
      console.log("Impossible de se connecter à votre messagerie", error);
  }
};

// Fonction de validation du formulaire
const validateForm = () => {
  validateField("nom");
  validateField("email");
  validateField("prenom");
  validateField("mot_de_passe");
  validateField("confirmation_mot_de_passe");
};

// Fonction de validation d'un champ spécifique
const validateField = (field) => {
  if (!formData[field].trim()) {
      errors[field] = `${field} est nécessaire`;
  } else {
      errors[field] = "";
  }
};

// Fonction pour vérifier si le formulaire est valide
const isValid = () => {
  return Object.values(errors).every((error) => !error);
};
</script>

<style>
.error {
  color: red;
}

input {
  width: 200px;
}
</style>
