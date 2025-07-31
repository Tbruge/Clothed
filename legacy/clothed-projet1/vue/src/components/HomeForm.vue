<template>
  <div class="container">
    <div >
      <form @submit.prevent="submitForm" class="form-horizontal">

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

        <div class="row">
          <div class="col-sm-offset-2 col-sm-10">
            <!-- Utilisez la classe correcte ici -->
            <button type="submit" class= " btn btn-primary custom_button"> Submit </button>
            <!-- <router-link to ="/login-account" v-if="isValid()" class="btn btn-primary custom_button"> Rediriger </router-link> -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import  axios  from "axios";
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'; // Importer useRouter depuis vue-router
const router = useRouter();

const formData = reactive({
  email: "",
  mot_de_passe: "",
});

const errors = reactive({
  email: "",
  mot_de_passe: "",
});

const submitForm = () => {
  validateForm();
  if (isValid()) {
    axios.post('http://localhost:3000/api/persons/checkPerson',formData)
      .then(response => {
        console.log(response.data)
        if(response.data === "valid"){
          router.push({ path: '/login-account' });
        }else {
          alert('Les valeurs entrées ne correspondent pas à celles de la base de données');
        }
        console.log("Formulaire soumis :", response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la soumission du formulaire:', error);
        });
      }
    

     }

///------------------------------addaed---------------

const validateForm = () => {
  validateField("email");
  validateField("mot_de_passe")
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

/* Supprimez display:inline-flex; car Bootstrap gère généralement le positionnement et le style des formulaires */
/* form{
  display:inline-flex;
  flex-direction: column;
  gap: 30px;
} */

label{
  display:inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 6px;
}

input{
  width: 200px;
}

</style>
