<template>
    <div class="text-center pa-4">
     <v-btn icon="mdi-plus" size="small" @click="dialog = true"/>
     <v-dialog
       v-model="dialog"
       width="400"
     >
       <v-card
         max-width="400"
         min-height="600"
       >
       <v-card-title>{{ getTargetDate() }}</v-card-title> 
       <v-card-subtitle>
        {{ ration.name }}
       </v-card-subtitle>
       <v-card-text class="pa-0">
          <v-row  
            no-gutters 
            align="center" 
            justify="space-between"
            class="pa-4"
            >
            <v-col cols="auto">
              <v-btn 
                density="compact" 
                prepend-icon="mdi-silverware-fork-knife" 
                stacked
                @click="showComponent('meal')"
                >Еда</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn 
                density="compact" 
                prepend-icon="mdi-history" 
                stacked
                @click="showComponent('history')"
                >История</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn 
                density="compact" 
                prepend-icon="mdi-food-drumstick" 
                stacked
                @click="showComponent('myMeal')"
                >Моя еда</v-btn>
            </v-col>
          </v-row> 

          
          
          <v-card-text>
            <div v-if="showMeal">
              <MealComponent :ration="ration"/>
            </div> 
            <div v-if="showHistory">
              <HistoryComponent/>
            </div>
            <div v-if="showMyMeal">
              <MyMealComponent/>
            </div>
          </v-card-text>
        
        
        
       </v-card-text> 
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
 import MealComponent from './menuSelectFoods/MealComponent.vue'
 import HistoryComponent from './menuSelectFoods/HistoryComponent.vue'
 import MyMealComponent from './menuSelectFoods/MyMealComponent.vue'  
 
 const props = defineProps({
  ration: Object
 })
//  console.log(props.ration);
 const calendarDaysStore = useCalendarDaysStore()
 const { getTargetDate } = calendarDaysStore

 const dialog = ref(false)

 const showMeal = ref(true)
 const showHistory = ref(false)
 const showMyMeal = ref(false)



 function showComponent(nameComponent) {
  switch(nameComponent){
    case 'meal': {
      showMeal.value = true
      showHistory.value = false
      showMyMeal.value = false
      break
    }
    case 'history': {
      showMeal.value = false
      showHistory.value = true
      showMyMeal.value = false
      break
    }
    case 'myMeal': {
      showMeal.value = false
      showHistory.value = false
      showMyMeal.value = true 
      break
    }
  }
 } 

 </script>
 
 <style>
 
 </style>