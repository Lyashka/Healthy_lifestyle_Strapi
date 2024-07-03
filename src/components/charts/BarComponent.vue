<template>
   <Bar  :data="data" :options="options" />
</template>

<script setup>
import { ref, computed, onMounted, watch  } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

import { useCalendarDaysStore } from '@/stores/calendarDays' 
const calendarDaysStore = useCalendarDaysStore()
const { calendarDays, calculateMyCalories, updateCalendarDays } = calendarDaysStore

import { useSelectedDateForStatisticsDataStore } from '@/stores/selectedDateForStatisticsData'
const selectedDateForStatisticsDataStore = useSelectedDateForStatisticsDataStore()
const { selectedDates, getSelectedDates } = selectedDateForStatisticsDataStore


// const parametrs = ref([]) 
const labels = ref(buildArrayLabels()) 
const parametrs = ref(buildArrayParametrs()) 


function buildArrayParametrs() {
    if(localStorage.getItem('calendarDays')){
      updateCalendarDays(JSON.parse(localStorage.getItem('calendarDays')))
    }

    let arrayParametrs = []
    const labelsValue = getSelectedDates()
   
    labelsValue.forEach(item => {
        calendarDays.forEach(el => {
            // console.log(item.toLocaleDateString());
            if(item.toLocaleDateString() === el.date) {
                arrayParametrs.push(el.summCalories)
            }else{
                arrayParametrs.push(0)
            }
        })
    })
    // console.log(labelsValue);
    // console.log(calendarDays);
    return arrayParametrs
}

// const labels = ref([]) 


function buildArrayLabels() {
    let arrayLabels = []
    getSelectedDates().forEach(el => {
        arrayLabels.push(el.toLocaleDateString())
    })
    // console.log(arrayLabels);
    return arrayLabels
}

const data = ref({
  labels: labels.value,
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: parametrs.value
    }
  ]
})

watch(selectedDates,  () => {
    console.log('1');
    data.value.labels = buildArrayLabels()
    data.value.datasets[0].data = buildArrayParametrs()
    labels.value = buildArrayLabels()
    parametrs.value = buildArrayParametrs()
    console.log(data.value.datasets[0].data);
    console.log(data.value.labels);
 
})

onMounted(() => {
    if(localStorage.getItem('calendarDays')){
      updateCalendarDays(JSON.parse(localStorage.getItem('calendarDays')))
  }
  
    data.value.labels = buildArrayLabels()
    data.value.datasets[0].data = buildArrayParametrs()

})

const options = {
    plagins: {
        legends: false
    },
  responsive: true,
  maintainAspectRatio: false
}

</script>

<style>

</style>