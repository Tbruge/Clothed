<template>
  <!-- Formulaire de connexion -->
  <div class="demo">
    <div class="form-container">
      <h1>Formulaire de connexion</h1>
      <form @submit.prevent="submitForm" class="form-horizontal">
        <!-- Champ Email -->
        <div class="mb-4 row">
          <label class="control-label col-sm-2" for="inputEmail"> Email: </label>
          <div class="col-sm-10">
            <input v-model="formData.email" class="form-control" id="inputEmail" placeholder="Adresse Email" type="email" />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>
        </div>
        <!-- Champ Mot de passe -->
        <div class="mb-4 row">
          <label class="control-label col-sm-2" for="inputMotDePasse"> Mot de passe: </label>
          <div class="col-sm-10">
            <input v-model="formData.mot_de_passe" class="form-control" id="inputMotDePasse" placeholder="Votre mot de passe" type="password" />
            <span v-if="errors.mot_de_passe" class="error">{{ errors.mot_de_passe }}</span>
          </div>
        </div>
        <!-- Bouton de connexion -->
        <div class="row">
          <div class="col-sm-offset-2 col-sm-10" >
            <button type="submit" class="btn btn-primary" style="border-radius: 20px"> Connecter vous a votre compte </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

// Données du formulaire
const formData = reactive({
  email: "",
  mot_de_passe: "",
});

// Erreurs de validation
const errors = reactive({
  email: "",
  mot_de_passe: "",
});

// Soumission du formulaire
const submitForm = () => {
  validateForm();
  if (isValid()) {
    // Envoi des données du formulaire au serveur pour vérification
    axios.post('http://localhost:3000/api/persons/checkPerson', formData)
      .then(response => {
        if (response.data.status === "valid") {
          // Si la vérification réussit, mise à jour des données utilisateur dans le store Vuex
          store.commit('setUserData', {
            nom: response.data.info.nom,
            name: response.data.info.nom,
            email: response.data.info.email,
            mot_de_passe: response.data.info.password,
            prenom: response.data.info.prenom,
            id: response.data.info.id
          });
          // Enregistrement des données utilisateur dans le localStorage
          saveUserDataToLocalStorage();
          // Redirection vers la page de connexion
          router.push({ path: '/login-account' })
        } else {
          alert('Les valeurs entrées ne correspondent pas à celles de la base de données');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la soumission du formulaire:', error);
      });
  }
};

// Enregistrement des données utilisateur dans le localStorage
const saveUserDataToLocalStorage = () => {
  localStorage.setItem('userData', JSON.stringify(store.state.userData))
};

// Validation du formulaire
const validateForm = () => {
  validateField("email");
  validateField("mot_de_passe");
};

// Validation d'un champ
const validateField = (field) => {
  if (!formData[field].trim()) {
    errors[field] = `${field} est nécessaire`;
  } else {
    errors[field] = "";
  }
};

// Vérification de la validité du formulaire
const isValid = () => {
  return Object.values(errors).every((error) => !error);
};

</script>

<style>

.error {
  color: red;
}


label{
  display:inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 6px;
}

input{
  width: 200px;
}



.demo{ background: #F2F2F2; }
.form-container{
    background: #ecf0f3;
    font-family: 'Nunito', sans-serif;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
}
.form-container .form-icon{
    color: #40ac52;
    font-size: 55px;
    text-align: center;
    line-height: 100px;
    width: 100px;
    height:100px;
    margin: 0 auto 15px;
    border-radius: 50px;
    box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px #fff;
}
.form-container .title{
    color: #40ac52;
    font-size: 25px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    margin: 0 0 20px;
}
.form-container .form-horizontal .form-group{ margin: 0 0 25px 0; }
.form-container .form-horizontal .form-group label{
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
}
.form-container .form-horizontal .form-control{
    color: #333;
    background: #ecf0f3;
    font-size: 15px;
    height: 50px;
    padding: 20px;
    letter-spacing: 1px;
    border: none;
    border-radius: 50px;
    box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px #fff;
    display: inline-block;
    transition: all 0.3s ease 0s;
}
.form-container .form-horizontal .form-control:focus{
    box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px #fff;
    outline: none;
}
.form-container .form-horizontal .form-control::placeholder{
    color: #808080;
    font-size: 14px;
}
.form-container .form-horizontal .btn{
    color: #000;
    background-color: #40ac52;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    width: 100%;
    padding: 12px 15px 11px;
    border-radius: 20px;
    box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px #fff;
    border: none;
    transition: all 0.5s ease 0s;
}
.form-container .form-horizontal .btn:hover,
.form-container .form-horizontal .btn:focus{
    color: #fff;
    letter-spacing: 3px;
    box-shadow: none;
    outline: none;
}

</style>
../eventBus