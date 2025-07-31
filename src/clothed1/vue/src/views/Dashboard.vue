<template>
    <!-- Contenu du composant -->
    <div class="dashboard">
        <!-- Intégration du composant Sidebar -->
        <Sidebar/>
        <!-- Contenu principal de la page -->
        <div class="content">
            <!-- Utilisation de router-view pour afficher les composants correspondant aux routes -->
            <router-view/>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/sidebar'; // Import du composant Sidebar

export default {
    name: 'dashboard', // Nom du composant
    components: {
        Sidebar // Enregistrement du composant Sidebar
    }
}
</script>


<style>
.dashboard {
    display: grid;
    grid-template-columns: 1fr 5fr;
    background-color: teal;
    height: 100vh;
    width: 100vw;
    
}

.content {
    background-color: white;
    border-radius: 10px;
    margin: 6px 6px 6px 0px;
    overflow-y: auto;
    max-height: 100vh
}
</style>