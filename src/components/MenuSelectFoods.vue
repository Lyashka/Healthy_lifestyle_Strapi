<template>
  <div class="text-center pa-2">
    <v-btn 
      color = "rgba(34, 139, 34, 0.7)"
      icon="mdi-plus" 
      size="small" 
      @click="dialog = true" 
    />
    <v-dialog
      v-model="dialog"
      :width="width"
    >
      <v-card 
        :height="height"
      >
        <v-card-title>
          <v-row>
            <v-col>
              {{ getTargetDate() }}
            </v-col>
            <v-col cols="auto">
              <v-badge 
                :content="selectedFoodsCount" 
                color="info"
                inline
              >
                <v-icon icon="mdi-check" size="x-large"></v-icon>
              </v-badge>
            </v-col>
          </v-row>
        </v-card-title> 
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
                >
                Еда
              </v-btn>
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
                >
                История
              </v-btn>
            </v-col>
            <v-col>
              <v-btn 
                height="100%"
                width="100%" 
                density="compact" 
                prepend-icon="mdi-food-drumstick" 
                class="py-1"
                stacked
                @click="showComponent('myMeal')"
                >
                Моя еда
              </v-btn>
            </v-col>
          </v-row> 

          <v-card-text>
            <div v-if="showMeal">
              <MealComponent :foodBase="foodBase" @updateSelectedFood="updateMealSelectedFood"/> 
            </div> 
            <div v-if="showHistory">
              <HistoryComponent @updateSelectedFood="updateHistorySelectedFood"/>
            </div>
            <div v-if="showMyMeal">
              <MyMealComponent @updateSelectedFood="updateMyFoodSelectedFood"/>
            </div>
          </v-card-text>
        
        </v-card-text> 
        <template v-slot:actions>
          <v-btn 
            text="Cancel"
            @click="closeMenu"
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
 import { onMounted, ref, computed } from 'vue'
 import { useDisplay } from 'vuetify'
 const { name } = useDisplay()
 const height = computed(() => {
    console.log(name.value);
    switch (name.value) {
      case 'xs': return 700
      case 'sm': return 800
      case 'md': return 900
      case 'lg': return 1000
      case 'xl': return 1100
      case 'xxl': return 1200
    }

    return undefined
  })
  const width = computed(() => {
    switch (name.value) {
      case 'xs': return 500
      case 'sm': return 500
      case 'md': return 550
      case 'lg': return 650
      case 'xl': return 700
      case 'xxl': return 800
    }

    return undefined
  })

 import MealComponent from './menuSelectFoods/MealComponent.vue'
 import HistoryComponent from './menuSelectFoods/HistoryComponent.vue'
 import MyMealComponent from './menuSelectFoods/MyMealComponent.vue'  

 import getFoodBase from '@/composables/requestGetFoodBase.js'
 
 import { useCalendarDaysStore } from '../stores/calendarDays'
 const calendarDaysStore = useCalendarDaysStore()
 const { getTargetDate, addNewDataInCalendar } = calendarDaysStore

 import { useHistoryDataStore } from '@/stores/historyData'
 const historyDataStore = useHistoryDataStore()
 const { addProductInHostory } = historyDataStore

 import { useSelectedDataStore } from '@/stores/selectedData'
 const selectedDataStore = useSelectedDataStore()
 const { addSelectedData, getSelectedData, clearSelectedData, getLengthSelectedData, clearLengthSelectedData } = selectedDataStore

 const props = defineProps({
  ration: Object
 })

 const dialog = ref(false)

 const showMeal = ref(true)
 const showHistory = ref(false)
 const showMyMeal = ref(false)

 const selectedFoodsCount = ref(0)

 const selectedData = ref([])

 const foodBase = ref([])

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

  
 function updateMealSelectedFood(selectedFood) {
  selectedData.value = selectedFood
  addSelectedData(selectedFood, 1)   

  selectedFoodsCount.value = getLengthSelectedData()
}

  function updateHistorySelectedFood(selectedFood) {
    selectedData.value = selectedFood
    addSelectedData(selectedFood, 2)   
    
    selectedFoodsCount.value = getLengthSelectedData()
  }

  function updateMyFoodSelectedFood(selectedFood) {
    selectedData.value = selectedFood
    addSelectedData(selectedFood, 3)   
    
    selectedFoodsCount.value = getLengthSelectedData()
  }

function addNewFood(){ 
  addNewDataInCalendar(
    {
      date: getTargetDate(), 
      ration: props.ration,
      selectedFoods: getSelectedData()
    }
  )
  addProductInHostory(selectedData.value)
  clearSelectedData()
  clearLengthSelectedData()
  localStorage.removeItem('showFoods');
  localStorage.removeItem('selectedFoodForMeal');
  selectedFoodsCount.value = 0
  dialog.value = false
}

function closeMenu() {
  clearSelectedData()
  clearLengthSelectedData()
  localStorage.removeItem('showFoods');
  localStorage.removeItem('selectedFoodForMeal');
  selectedFoodsCount.value = 0
  dialog.value = false
}

 onMounted(async () => {
  foodBase.value = await getFoodBase()
 })
 </script>
 
 <style>
 
 </style>