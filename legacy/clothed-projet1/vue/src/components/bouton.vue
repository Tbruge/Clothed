<template>
    <!-- creation du button dynamiquement,
    - :class suggère que la classe du bouton peut changer dynamiquement en fonction de la valeur de la proprièté button 
    - slot permet d'insèrer le contenue écrit entre les balise button-->
    
    <div class="d-grid gap-2">
      <button @click="handleClick" type="button" class="btn" :class="buttonClass">
    <slot></slot> </button>
    </div>

    </template>
z
    <script>
    export default {
        methods:{
            handleClick(){
                this.$emit('button-click');

            }
        }
    }</script>

    <style>

    </style>