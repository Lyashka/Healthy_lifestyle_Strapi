<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup> 

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {ref, computed, watch } from 'vue'

import AnnotationPlugin from 'chartjs-plugin-annotation';

import { usePersonalizationDataStore } from '@/stores/personalizationData';
const personalizationDataStore = usePersonalizationDataStore()
const { getPersonalization } = personalizationDataStore 

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, AnnotationPlugin)

const props = defineProps({
  data: Object
})

  const chartData = ref(props.data)

  const chartOptions = computed ( () => { 
    return {
      elements: {
        bar: {
          borderWidth: 1,
          borderColor: 'rgb(0, 0, 0)', 
          borderSkipped: false, 
          borderRadius: 7 
        }
      },
    
      plugins: {
        legend: {
          display: false
        },
        annotation: {
          annotations: {
            line: {
              type: 'line', 
              yMin: getPersonalization().needingCalories, 
              yMax: getPersonalization().needingCalories,
              borderColor: 'red', 
              borderWidth: 2,
            }
          }
        }
      }
    };
  })
    
watch(chartData.value, () => {
  chartData.value = { 
                      datasets: [ props.data.datasets[0] ],
                      labels: props.data.labels 
                    }
})


</script>