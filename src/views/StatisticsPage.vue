<template>
<div>
    <v-container class="bg-surface-variant">
        
        <v-row no-gutters> 
            <v-col> 
                <v-card  max-width="850px" min-width="350px" height="650px"  class="mx-auto" variant="outlined">
                    <SelectedDateForCharts/>
                    <BarComponent/>
                </v-card>
            </v-col>
            <!-- <v-col>
                <v-card max-width="850px" min-width="350px" height="450px" class="mx-auto" variant="outlined">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, cupiditate pariatur nostrum, quos dolores consectetur veritatis qui nulla optio minima, vero explicabo tenetur adipisci reiciendis! Nesciunt eveniet nam eaque illo.</v-card>
            </v-col>
            <v-col>
                <v-card max-width="850px" min-width="350px" height="450px" class="mx-auto" variant="outlined">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, cupiditate pariatur nostrum, quos dolores consectetur veritatis qui nulla optio minima, vero explicabo tenetur adipisci reiciendis! Nesciunt eveniet nam eaque illo.</v-card>

            </v-col> -->
        </v-row>
       
    </v-container>
    
</div>
</template>

<script setup>
import BarComponent from '../components/charts/BarComponent.vue'
import SelectedDateForCharts from '../components/charts/SelectedDateForCharts.vue'

import { onMounted } from 'vue'

import { useCalendarDaysStore } from '@/stores/calendarDays' 
const calendarDaysStore = useCalendarDaysStore()
const { updateCalendarDays } = calendarDaysStore

onMounted(() => {
  if(localStorage.getItem('calendarDays')){
    // if(calendarDays == []){
      updateCalendarDays(JSON.parse(localStorage.getItem('calendarDays')))
    // }
  }
})
</script>

