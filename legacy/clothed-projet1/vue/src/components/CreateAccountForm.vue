<template>

 <!-- creation du formulaire de create account  -->
  <div class="container">
    <div>
      <form @submit.prevent="submitForm" class="form-horizontal">
        <div class="mb-4 row">
          <label class="control-label col-sm-2" for="inputNom"> Nom: </label>
          <div class="col-sm-10">
            <input v-model="formData.nom" class="form-control" id="inputNom" placeholder="Votre Nom" type="text" />
            <span v-if="errors.nom" class="error">{{ errors.nom }}</span>
          </div>
        </div>

        <div class="mb-4 row">
          <label class="control-label col-sm-2" for="inputPrenom"> Prenom: </label>
          <div class="col-sm-10">
            <input v-model="formData.prenom" class="form-control" id="inputPrenom" placeholder="Votre Prenom" type="text" />
            <span v-if="errors.prenom" class="error">{{ errors.prenom }}</span>
          </div>
        </div>

        <div class="mb-4 row">
          <label class="control-label col-sm-2" for="inputEmail"> Email: </label>
          <div class="col-sm-10">
            <input v-model="formData.email" class="form-control" id="inputEmail" placeholder="Adresse Email" type="email" />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>
        </div>

        <div class="mb-4 row">
          <label class="control-label col-sm-2" for="inputMotDePasse"> Mot de passe: </label>
          <div class="col-sm-10">
            <input v-model="formData.mot_de_passe" class="form-control" id="inputMotDePasse" placeholder="Votre mot de passe" type="password" />
            <span v-if="errors.mot_de_passe" class="error">{{ errors.mot_de_passe }}</span>
          </div>
        </div>

        <div class="mb-4 row">
          <label class="control-label col-sm-2" for="inputConfirmationMotDePasse"> Confirmation mot de passe: </label>
          <div class="col-sm-10">
            <input v-model="formData.confirmation_mot_de_passe" class="form-control" id="inputConfirmationMotDePasse" placeholder="Confirmez votre mot de passe" type="password" />
            <span v-if="errors.confirmation_mot_de_passe" class="error">{{ errors.confirmation_mot_de_passe }}</span>
          </div>
        </div>

        <div class="mb-4 row">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-primary custom_button"> Créer votre compte </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'; // Importer useRouter depuis vue-router
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

const submitForm = () => {
  validateForm();
  if (isValid()) {
    axios.post('http://localhost:3000/api/persons/addPerson',formData)
    .then(response => {
        console.log(response.data)
        if(response.data === "valid"){
          router.push({ path: '/' });
          alert('compte créer avec success');
        }else {
          alert('désolé , l adresse email est déjà pris ');
        }
        console.log("Formulaire soumis :", response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la soumission du formulaire:', error);
        });
      }

    // Effectuez ici la logique de soumission du formulaire
    // console.log("Formulaire soumis :", formData);
};

const validateForm = () => {
  validateField("nom");
  validateField("email");
  validateField("prenom");
  validateField("mot_de_passe");
  validateField("confirmation_mot_de_passe");
};

const validateField = (field) => {
  if (!formData[field].trim()) {
    errors[field] = `${field} est nécessaire`;
  } else {
    errors[field] = "";
  }
};

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
