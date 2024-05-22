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
       >
       <v-card-title>{{ getTargetDate() }}</v-card-title>
       <v-card-text>Your application will relaunch automatically after the update is complete.</v-card-text>
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
 import { useCalendarDaysStore } from '../stores/calendarDays'   
  
 const calendarDaysStore = useCalendarDaysStore()
 const { getTargetDate } = calendarDaysStore

 const dialog = ref(false)
 </script>
 
 <style>
 
 </style>