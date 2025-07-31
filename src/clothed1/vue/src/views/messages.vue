<template>
  <!-- Conteneur principal avec une hauteur de 100% de la vue -->
    <div style="height: 100vh">
      
      <PrettyChatWindow
        :projectId="projectId"
        :username="username"
        :secret="secret"
      />  
    </div> <!-- Propriété pour l'identifiant du projet de chat, le nom d'utilisateur et le secret de l'utilisateur   -->
  </template>

<script>
  import { PrettyChatWindow } from "react-chat-engine-pretty";
  import { applyReactInVue } from "veaury";
  import env from '@/env';
  import {useStore} from 'vuex'
  import {computed} from 'vue'

    export default {
        setup() {
       const store = useStore();
       const username = computed(() => store.state.userData?.name);
       const secret = computed(() => store.state.userData?.mot_de_passe);
       // Récupération de l'identifiant du projet de chat depuis la configuration d'environnement
       const projectId= env.VITE_CHAT_ENGINE_PROJECT_ID 


      return {
        projectId ,
        username,
        secret
      };
    },
    components: {
      // Application du composant PrettyChatWindow dans Vue.js en utilisant applyReactInVue
      PrettyChatWindow: applyReactInVue(PrettyChatWindow),
    }
        
    }
</script>

<style scoped>

.ce-new-chat-button {
  width: 32px;
  position: relative;
  bottom: 22px;
}
</style>