<template>
  <v-row no-gutters> 
    <v-col> 
      <v-card  
        min-width="300px" 
        max-width="1050px"
        height="650px"  
        class="mx-auto text-center mt-5 pl-2 pr-2 bg-grey-lighten-2" 
        elevation="4" 
      >
        <SelectedDateForCharts @getParametrsCalories="getParametrsCalories"/>
        <BarComponent :data="data"/>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import BarComponent from '../components/charts/BarComponent.vue'
import SelectedDateForCharts from '../components/charts/SelectedDateForCharts.vue'
import { ref, onMounted } from 'vue'
import { useCalendarDaysStore } from '@/stores/calendarDays'
import { usePersonalizationDataStore } from '@/stores/personalizationData'; 

const { updateCalendarDays } = useCalendarDaysStore()
const { getPersonalization } = usePersonalizationDataStore()

const data = ref({
    datasets: [{ data: [] }], 
    labels: [],
  })

function getParametrsCalories(dataCalories) {
    data.value.datasets[0].data = dataCalories.parametrs
    data.value.labels = dataCalories.labels
    data.value.datasets[0].backgroundColor = dataCalories.parametrs.map(value => value >= getPersonalization().needingCalories ? '#ea5545' : '#87bc45')
}

onMounted(() => {
  if(localStorage.getItem('calendarDays')){
      updateCalendarDays(JSON.parse(localStorage.getItem('calendarDays')))
  }
})

</script>

