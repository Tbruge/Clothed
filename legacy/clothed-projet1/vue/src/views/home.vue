<template>
  <div>
    <!-- ajout des logos de la page d'accueil  -->
    <div class="container" >
      <div class ="row justify-content-center">
        <div class ="col-md-6">
          <img class="img-fluid header-img" src="@/assets/cl-logo.png" alt="logo de l'application clothed"> 
        </div>
        <div class ="col-md-6">
          <img class="img-fluid header-img" src="@/assets/unamur.png" alt="logo de l'université de Namur" > 
        </div>
      </div>
    </div>


    <h1>Application De Don </h1>
    
    <div >
      <Button @button-click="showCreateAccount" class=" btn-custom2 mt-4" buttonClass="create-account-btn"> Créer un nouveau compte</Button>
    </div>

    <HForm />

    <div class = "d-flex justify-content-end">
      <Button @button-click = "showLoginAccount" class="btn-custom1 mt-4" buttonClass="logging-account-btn "> Connecter vous a votre compte </Button>
    </div> 

    <!-- <RouterView></RouterView> -->
  </div>

</template>

<script>
import Button from '@/components/bouton.vue'
import HForm from '@/components/HomeForm.vue'
//   import {RouterView} from "vue-router"

export default {
  name: 'Home',
  components:{
    Button,
    HForm
  }, 
  methods: {
    showCreateAccount(){
      this.$router.push({name:'CreatingAccount'});

    },
    showLoginAccount(){
      this.$router.push({name:'LogAccount'});
    }
    

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn-custom1 {
  background-color: #16d83a;
  border-color: rgb(10, 115, 43);
  width: 400px;
  color: #fff;
  border-radius: 20px;
}

.btn-custom2{
  background-color: #FFA500;
  border-color: #c5850e;
  width: 400px;
  color: #fff;
  border-radius: 20px;
  margin-bottom: 5%;
}
</style>
