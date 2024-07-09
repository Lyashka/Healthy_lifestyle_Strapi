<template>
  <Bar  :data="chartData" :options="chartOptions" />
</template>

<script setup> 

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {ref, computed, onMounted, watch } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  data: Object
})

  const chartData = ref(props.data)
  const chartOptions = computed ( () => { return /* mutable chart options */ })
    
watch(chartData.value, () => {
  chartData.value = { datasets: [ props.data.datasets[0]], labels: props.data.labels }
  console.log(chartData.value);
})

</script>