<template>
   
    <div class="d-grid gap-2">
      <button @click="handleClick" type="button" class="btn" :class="buttonClass">
    <slot></slot> </button>
    </div>

    </template>

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