<template>
    <!-- Barre latérale -->
    <div class="sidebar">
        <!-- Titre de la barre latérale -->
        <div class="title">
            Beneficiare
        </div>

        <!-- Bouton de retour -->
        <div class="col-md-4 text-right">
            <div class="d-flex justify-content-end">
                <Button @button-click="retour" class="btn-custom3 mt-4"> Retour </Button>
            </div>
        </div>

        <!-- Liens vers différentes pages -->
        <div class="menu-items">
            <!-- Lien vers la page d'accueil -->
            <router-link to="/login-account/beneficiare" active-class="active" tag="button" exact class="side-btn router-link">
                <div class="link-container">
                    Accueil
                </div>
            </router-link>

            <!-- Lien vers la page des messages -->
            <router-link to="/messages" active-class="active" tag="button" exact class="side-btn router-link">
                <div class="link-container">
                    Messages
                </div>
            </router-link>

            <!-- Lien vers la page de profil -->
            <router-link to="/profile" active-class="active" tag="button" exact class="side-btn router-link">
                <div class="link-container">
                    Profile
                </div>
            </router-link>

            <!-- Lien vers la page d'archive -->
            <router-link to="/archive" active-class="active" tag="button" exact class="side-btn router-link">
                <div class="link-container">
                    Archive
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import Button from '@/components/bouton.vue'
import { useRouter } from 'vue-router';

export default {
    components: {
        Button,
    },
    setup() {
        const router = useRouter();

        // Fonction pour retourner à la page de connexion
        const retour = () => {
            router.push({ name: 'LogAccount' });
        };

        // Fonction pour afficher la page d'accueil
        const showHomepage = () => {
            router.push({ name: 'Home' });
        };

        return {
            retour,
            showHomepage
        };
    }
}
</script>

<style scoped>

.router-link {
    text-decoration: none ;
    color: inherit;
    background-color: white;
    border-radius: 3px;
    border-bottom: 5px;
    margin-top: 10px;
    padding:26px 0px;
    font-size: 20px ;
    transition: transform 0.5s;

}
 .title {
    color: white;
    font-size: 24px;
    margin-top: 10px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-right: 2px;
}

.menu-items > * {
    margin-top: 60px;
}

.router-link:hover,
.router-link:active {
  transform: scale(1.1); /* Agrandit le bouton de 10% lors du survol ou de l'activation */
}

.router-link.active {
  background-color: rgb(9, 153, 64); /* Couleur différente pour le bouton actif */
  color: white; /* Texte blanc pour le bouton actif */
}

.router-link.active {
    position: relative;
    background-color: rgb(9, 238, 135);
    color: black;
    font-weight: 600;
    margin-left: 2px;
    padding:26px 12px;
    margin-right: 1px;
}

.router-link.active::before {
    top: -30px;
}

/* .side-btn{
    border: none;
    padding: 16px 0px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: transparent;
}  */

.side-btn:focus {
    outline: none;
}
/*




.side-btn router-link.active::after {
    bottom: -30px;
}

.side-btn router-link.active::before, .side-btn router-link.active::after {
    position: absolute;
    content: "";
    right: 0;
    height: 30px;
    width: 30px;
    background-color: white;
}

.side-btn router-link.active .link-container::before {
    top: -60px;
}

.side-btn router-link.active .link-container::after {
    bottom: -60px;
    z-index: 99;
}

.side-btn router-link.active .link-container::before, .side-btn router-link.active .link-container::after {
    position: absolute;
    content: "";
    right: 0px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: teal;
}  */
</style>