<template>
    <h1> Bienvenue NOM(à inclure)  </h1>

    <div >
      <button class="btn-lg btn_custom4"> Quel  mode  de  connexion  préférez-vous  utiliser  aujourd’hui ? </button>
    </div>
    
  
    <div class="d-flex justify-content-end">
     <Button @button-click="showBeneficiary" class="btn btn-lg btn_custom5 flex-grow-1" buttonClass="beneficiary-btn">BENEFICIARE</Button>
     <Button @button-click="showDonator" class="btn btn-lg btn_custom5 flex-grow-1" buttonClass="donator-btn">DONATEUR</Button>
   </div>

  <!-- <div class="d-flex">
    <button type="button" class="btn btn-lg btn_custom5 flex-grow-1" >DONATEUR</button>
    <button type="button" class="btn btn-lg btn_custom5 flex-grow-1">BENEFICIAIRE</button>
  </div> -->

    <!-- <div class="d-flex">
        <button type="button" class="btn btn-lg btn-custom4">DECONNECTION</button>
    </div> -->

    <div class="d-flex">
        <Button @button-click="showHomepage" class="btn btn-lg btn-custom4" buttonClass="deconnect-btn">DECONNECTION</Button>
    </div>

</template>

<script>
import Button from '@/components/bouton.vue'

export default{
    name:'LogAccount',
    components:{
        Button,
    },
    methods:{
        showDonator(){
            this.$router.push({name:'Donateur'});
        },
        showBeneficiary(){
            this.$router.push({name:'Beneficiare'});
        },
        showHomepage(){
            this.$router.push({name:'Home'});
        }

    }

}
</Script>

<style>
.btn_custom4{
    background-color: #66635c;
    border-color: #645e56;
    width:50%;
    min-height: 50px;
    border-radius: 10%;
    color: #fff;
    margin: 10px ;
    margin-top: 5%;
    margin-bottom: 3%;
    font-size: 20px;
}

.btn_custom5{
    background-color:cadetblue;
    border-color:cadetblue;
    color: #fff;
    margin: 10px ;
    margin-top: 3%;
    margin-bottom: 3%;
    min-height: 250px;
}
</style>