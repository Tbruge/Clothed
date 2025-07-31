<template>
  <!-- Contenu du formulaire d'importation -->
  <div class="form-container">
      <!-- Barre de navigation -->
      <div class="container-fluid">
          <div class="row">
              <!-- Colonne pour le bouton "Retour" -->
              <div class="col-md-4 text-md-end"> 
                  <!-- Bouton "Retour" avec événement de clic lié à la méthode "retour" -->
                  <div class="d-flex justify-content-md-end">
                      <Button @button-click="retour" class="btn-custom3 mt-md-4">Retour</Button>
                  </div>
              </div>
              <!-- Colonne pour le titre -->
              <div class="col-md-4 text-center mt-md-3">
                  <h1>Importer votre article</h1>
              </div>
              <!-- Colonne vide pour l'espacement -->
              <div class="col-md-4"></div>
          </div>
      </div>

      <!-- Affichage du nom de la personne connectée -->
      <div>{{ personName }}</div>

      <!-- Formulaire d'importation d'image -->
      <div class="container mt-5">
          <div class="row">
              <div class="col-md-6 mx-auto">
                  <div class="square mb-5">
                      <!-- Bouton pour sélectionner une image -->
                      <input type="file" name="image" id="imageInput" @change="handleImageUpload" class="btn btn-recommencer btn-import-donator w-100" accept="image/*" style="display: none">
                      <label for="imageInput" class="btn btn-recommencer btn-import-donator w-100">Importer votre image</label>

                      <!-- Formulaire pour soumettre l'image -->
                      <form @submit.prevent="submitForm" enctype="multipart/form-data" class="mt-4">
                          <div class="mb-3">
                              <label for="donatorCategory" class="form-label">Catégorie</label>
                              <!-- Sélection de la catégorie de l'article -->
                              <select v-model="articleCategory" class="form-select" id="donatorCategory" required>
                                  <option disabled selected>Sélectionnez votre catégorie d'article</option>
                                  <option value="Vêtement">Vêtement</option>
                                  <option value="Article_scolaire">Article scolaire</option>
                                  <option value="Electroménager">Electroménager</option>
                                  <option value="Autre">Autre</option>
                              </select>
                          </div>
                          <!-- Bouton pour soumettre le formulaire -->
                          <button type="submit" class="btn btn-primary btn-send-donator w-100">Envoyer</button>
                      </form>

                      <!-- Bouton pour recommencer le formulaire -->
                      <button type="button" class="btn btn-recommencer btn-restart-donator w-100 mt-3" @click="resetForm">Recommencer</button>
                  </div>
              </div>
          </div>
      </div>

      <!-- Bouton de déconnexion -->
      <div class="container mt-3">
          <div class="row">
              <div class="col-md-12 text-center">
                  <!-- Bouton "Déconnexion" avec événement de clic lié à la méthode "showHomepage" -->
                  <Button @button-click="showHomepage" class="btn btn-lg btn-custom4">DECONNEXION</Button>
              </div>
          </div>
      </div>
  </div>

  <div v-if="errorMessage" class="alert alert-danger">
    {{ errorMessage }}
  </div>
</template>

<script>
import Button from '@/components/bouton.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';
import { personName, personEmail } from '@/components/fonction';

export default {
  name: 'Donateur', // Nom du composant
  components: {
      Button, // Import du composant Button
  },
  setup() {
      const router = useRouter(); // Accès au routeur de l'application
      const articleCategory = ref(' '); // Référence pour stocker la catégorie de l'article
      let selectedImage = null; // Variable pour stocker l'image sélectionnée
      const errorMessage = ref('');

      // Méthode pour retourner à la page précédente
      const retour = () => {
          router.push({ name: 'LogAccount' });
      };

      // Méthode pour afficher la page d'accueil et supprimer les données de l'utilisateur enregistrées localement
      const showHomepage = () => {
          localStorage.removeItem('setArticleDetails');
          localStorage.removeItem('userData');
          router.push({ name: 'Home' });
      };

      // Méthode pour gérer le téléchargement de l'image
      const handleImageUpload = (event) => {
          selectedImage = event.target.files[0];
          if (!selectedImage.size) {
            errorMessage.value = "Veuillez choisir un fichier à importer.";
          }
      };

      // Méthode pour soumettre le formulaire
      const submitForm = async () => {
          if (!selectedImage) {
            errorMessage.value = "Aucune image chargée, veuillez charger une image avant de soumettre.";
              return;
          }
          
          const formData = new FormData();
          formData.append('image', selectedImage, selectedImage.name);
          formData.append('articleCategory', articleCategory.value);
          formData.append('articleMail', personEmail.value);

          try {
              // Envoi de la requête POST avec les données du formulaire à l'API backend
              axios.post('http://localhost:3000/api/persons/addImage', formData)
                  .then(response => {
                      console.log('Réponse du backend:', response.data);
                      alert('image envoyé avec succès');
                  });
          } catch (error) {
            errorMessage.value = 'Erreur lors de l\'envoi des données: ' + error.message; 
          }
           
      };

      // Méthode pour réinitialiser le formulaire
      const resetForm = () => {
          articleCategory.value = '';
          selectedImage = null;
          errorMessage.value = '';
      };

      return {
          retour,
          showHomepage,
          personName,
          submitForm,
          handleImageUpload,
          articleCategory,
          resetForm,
          selectedImage,
          personEmail,
          errorMessage
      };
  },
};
</script>
  
  <style>

  
.square {
  max-width: 100%;
  height: auto;
  width: 100%; /* Largeur fixe pour la boîte carrée */
  padding-bottom: 18%; /* Proportion de la boîte carrée */
  border-radius: 20%; /* Bordure arrondie pour la boîte carrée */
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

.btn-recommencer {
  background-color: cadetblue;
  border-color: cadetblue;
  color: white;
}

/* Média queries pour rendre le design responsive */

@media (max-width: 768px) {
  .square {
    border-radius: 0; /* Modifier le rayon de bordure pour s'adapter à la taille de l'écran */
  }

  .container1 {
    height: auto; /* Hauteur automatique pour s'adapter au contenu */
  }

  .btn-import-donator,
  .btn-send-donator,
  .btn-restart-donator {
    min-height: 3em; /* Réduire la hauteur des boutons pour s'adapter à l'espace disponible */
  }
}

@media (max-width: 576px) {
  .square {
    padding-bottom: 50%; /* Ajustez la proportion de la boîte carrée */
  }

  .donateur_form1 {
    padding: 0 10px; /* Ajuster la marge intérieure pour un meilleur ajustement */
  }
}

  </style>
  