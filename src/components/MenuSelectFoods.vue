<template>
    <div class="text-center pa-2">
     <v-btn icon="mdi-plus" size="small" @click="dialog = true"/>
     <v-dialog
       v-model="dialog"
       width="500"
     >
       <v-card 
         min-height="700"
       >
       <v-row>
         
          <v-col>
            <v-card-title>{{ getTargetDate() }}</v-card-title> 
          </v-col>
          <v-col cols="auto">
            <v-badge 
              :content="selectedFoodsCount" 
              class="pa-4" 
              color="info"
              inline
              >
              <v-icon icon="mdi-check" size="x-large"></v-icon>
            </v-badge>
          </v-col>
       </v-row>
      
       <v-card-subtitle>
        {{ ration.name }}
       </v-card-subtitle>
       <v-card-text class="pa-0">
          <v-row
            text-align="center" 
            justify="space-between"
            class="d-flex flex-nowrap  pa-4"
            >
            <v-col>
              <v-btn
                width="100%" 
                height="100%"
                density="compact" 
                prepend-icon="mdi-silverware-fork-knife" 
                class="py-1"
                stacked
                @click="showComponent('meal')"
                >Еда</v-btn>
            </v-col>
            <v-col >
              <v-btn 
                height="100%"
                width="100%" 
                density="compact" 
                prepend-icon="mdi-history" 
                class="py-1"
                stacked
                @click="showComponent('history')"
                >История</v-btn>
            </v-col>
            <v-col >
              <v-btn 
                height="100%"
                width="100%" 
                density="compact" 
                prepend-icon="mdi-food-drumstick" 
                class="py-1"
                stacked
                @click="showComponent('myMeal')"
              
                >Моя еда</v-btn>
            </v-col>
          </v-row> 

          <v-card-text>
            <div v-if="showMeal">
              <MealComponent :ration="ration" @updateSelectedFood="updateSelectedFood"/> 
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
             @click="addNewFood"
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
 const { getTargetDate, addNewDataInCalendar } = calendarDaysStore

 const dialog = ref(false)

 const showMeal = ref(true)
 const showHistory = ref(false)
 const showMyMeal = ref(false)

 const selectedFoodsCount = ref(0)
 const selectedData = ref([])

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

  
 function updateSelectedFood(selectedFood) {
  selectedFoodsCount.value = selectedFood.length
  selectedData.value = selectedFood
}

function addNewFood(){ 
  // console.log(getTargetDate());
  // console.log(props.ration);
  // console.log(selectedData.value);

  addNewDataInCalendar(
    {
      date: getTargetDate(), 
      ration: props.ration,
      selectedFoods: selectedData.value
    }
  )

  dialog.value = false
}
 
 </script>
 
 <style>
 
 </style>