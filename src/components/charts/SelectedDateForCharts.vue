<template>
  <div>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="center"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            prepend-icon="$calendar" 
            color="white"
            v-bind="props"
          >  
          <div v-if="selectedDate.length > 1"> 
            {{ selectedDate[0].toLocaleDateString() }} - {{ selectedDate[selectedDate.length-1].toLocaleDateString() }}
          </div>
          <div v-else>
            {{ selectedDate[0].toLocaleDateString() }}
          </div>
            
          </v-btn>
        </template>
  
        <v-card min-height="300px">
          <v-date-picker v-model="selectedDate" hide-header multiple="range"></v-date-picker>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text" 
              @click="saveDay"
            >
              OK
            </v-btn> 
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'  

import getDataCalories from '@/composables/calculateDataCaloriesForDays'

import { useSelectedDateForStatisticsDataStore } from '@/stores/selectedDateForStatisticsData'
const selectedDateForStatisticsDataStore = useSelectedDateForStatisticsDataStore()
const { updateSelectedDates, getSelectedDates } = selectedDateForStatisticsDataStore
  


let menu = ref(false)
  
let selectedDate = ref([new Date()]);

watch(selectedDate, () => {
    console.log(getSelectedDates());
})

const emit = defineEmits(
  ['getParametrsCalories'] 
  )

function saveDay() {
    updateSelectedDates(selectedDate.value)

    emit('getParametrsCalories', getDataCalories())
    menu.value = false
}
onMounted(() => {

  //тут создать массив вокруг сегодняшнего дня
  updateSelectedDates(selectedDate.value)
  emit('getParametrsCalories', getDataCalories())
})

</script>

<style scoped>

</style>