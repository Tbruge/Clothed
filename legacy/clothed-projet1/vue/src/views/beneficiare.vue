<template>

    <div class="bg-gray min-vh-10">
        <header class="bg-white shadow-lg py-2 justify-content-between align-items-stretch">
            <div class="align-items-center gap-1">
                <router-link :to= "{name: 'byname'}" class="btn btn-recommencer flex-grow-1 px-2 h-100">Recherche Article </router-link>
                <router-link :to="{name: 'by-letter'}" class="btn btn-recommencer flex-grow-1 px-2 h-100">Rechercher par lettre</router-link>
            </div>
        </header>
    </div>


    <div class="col-md-4 text-right"> 
        <div class = "d-flex justify-content-end">
            <Button @button-click = "retour" class="btn-custom3 mt-4" buttonClass="logging-account-btn "> Retour </Button>
        </div> 


      </div>

      <div class="d-flex flex-column p-4 ">

            <input type="text" class="form-control rounded border border-secondary col-8 mb-4" placeholder=" rechercher un article " />

        
        <div class="justify-center-between gap-8 mt-2">
            <router-link :to="{name: 'by-letter',params : {letter}}" v-for = "letter of letters " :key="letter">
             <span  class="btn btn-outline-dark" > {{ letter }} </span> 
            </router-link>
        </div>


      </div>
    
</template>

<script>
import store from '@/store';
import { computed, onMounted , ref} from 'vue';
import Button from '@/components/bouton.vue'
import { useRouter } from 'vue-router';
import axiosClient from '../components/axiosClient';

export default {
    name: 'Beneficiare',
    components: {
        Button,
    },
    setup() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");

        const articles = ref([])
        onMounted( async () => {
            try {
                const response = await axiosClient.get('/list.php?i=list')
                console.log(response.data)
                articles.value = response.data
            }catch(error) {
                console.error('Error fetching articles:', error);
            }
            
        })
        
        const router = useRouter();

        const retour = () => {
            router.push({ name: 'LogAccount' });
        };

        return {
            letters,
            retour,
            articles
        };
    }
}
</script>


