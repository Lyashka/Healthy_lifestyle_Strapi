<template>
    <div class="text-center pa-4">
     <v-btn icon="mdi-plus" size="small" @click="dialog = true"/>
     <v-dialog
       v-model="dialog"
       width="auto"
     >
       <v-card
         max-width="400"
         min-height="600"
         text="Your application will relaunch automatically after the update is complete."
         title="Update in progress"
       >
         <template v-slot:actions>
           <v-btn 
             text="Cancel"
             @click="dialog = false"
           />
           <v-btn
             class="ms-auto"
             text="Ok"
             @click="dialog = false"
           />
         </template>
       </v-card>
     </v-dialog>
   </div>
 </template>
 
 <script setup>
 import { ref } from 'vue'
 
 const dialog = ref(false)
 </script>
 
 <style>
 
 </style>