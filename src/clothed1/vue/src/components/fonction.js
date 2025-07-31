/**
 * Import du hook de route Vue Router et de la fonction computed de Vue.js
 */
import { useRouter } from 'vue-router';
import { computed } from 'vue';

// Utilisation du hook de route Vue Router pour obtenir l'instance du routeur
const router = useRouter();

/**
 * Propriété calculée pour obtenir le nom de l'utilisateur à partir des données stockées dans le localStorage
 * @returns {string} Le nom de l'utilisateur ou une chaîne vide s'il n'y a pas de données utilisateur
 */
const personName = computed(() => { 
    const user = localStorage.getItem('userData');
    if(user){
        const { name } = JSON.parse(user);
        return name;
    }
    return '';
});

/**
 * Propriété calculée pour obtenir le prénom de l'utilisateur à partir des données stockées dans le localStorage
 * @returns {string} Le prénom de l'utilisateur ou une chaîne vide s'il n'y a pas de données utilisateur
 */
const personPrenom = computed(() => { 
    const user = localStorage.getItem('userData');
    if(user){
        const { prenom } = JSON.parse(user);
        return prenom;
    }
    return '';
});

/**
 * Propriété calculée pour obtenir l'e-mail de l'utilisateur à partir des données stockées dans le localStorage
 * @returns {string} L'e-mail de l'utilisateur ou une chaîne vide s'il n'y a pas de données utilisateur
 */
const personEmail = computed(() => { 
    const user = localStorage.getItem('userData');
    if(user){
        const { email } = JSON.parse(user);
        return email;
    }
    return '';
});

/**
 * Propriété calculée pour obtenir le mot de passe de l'utilisateur à partir des données stockées dans le localStorage
 * @returns {string} Le mot de passe de l'utilisateur ou une chaîne vide s'il n'y a pas de données utilisateur
 */
const personMdp = computed(() => { 
    const user = localStorage.getItem('userData');
    if(user){
        const { mot_de_passe } = JSON.parse(user);
        return mot_de_passe;
    }
    return '';
});

/**
 * Propriété calculée pour obtenir l'identifiant de l'utilisateur à partir des données stockées dans le localStorage
 * @returns {string} L'identifiant de l'utilisateur ou une chaîne vide s'il n'y a pas de données utilisateur
 */
const personId = computed(() => { 
    const user = localStorage.getItem('userData');
    if(user){
        const { id } = JSON.parse(user);
        return id;
    }
    return '';
});

// Export des propriétés calculées pour une utilisation dans d'autres fichiers
export { personName, personEmail, personMdp, personPrenom, personId };
