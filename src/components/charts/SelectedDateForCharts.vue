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
          <div v-if="selectedDate.length > 0"> 
            {{ selectedDate[0].toLocaleDateString() }} - {{ selectedDate[selectedDate.length-1].toLocaleDateString() }}
          </div>
          <div v-else>
            {{ new Date().toLocaleDateString() }}
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

import { useSelectedDateForStatisticsDataStore } from '@/stores/selectedDateForStatisticsData'
const selectedDateForStatisticsDataStore = useSelectedDateForStatisticsDataStore()
const { updateSelectedDates, getSelectedDates } = selectedDateForStatisticsDataStore
  
let menu = ref(false)
  
let selectedDate = ref([]);

onMounted(() => {
    // console.log(selectedDate.value.length);   
})
watch(selectedDate, () => {
    console.log(getSelectedDates());
  
})

function saveDay() {
    updateSelectedDates(selectedDate.value)
    menu.value = false
}

</script>

<style scoped>

</style>