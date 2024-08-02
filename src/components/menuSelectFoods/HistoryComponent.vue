<template>
  <div v-if="!filteredFood.length"> 
    История пуста 
  </div>
  <FoodItem 
    :filteredFood="filteredFood" 
    @updateSelectedFood="updateSelectedFood"
  />
</template>

<script setup>
import { useHistoryDataStore } from '@/stores/historyData.js'
import FoodItem from './FoodItem.vue';

const { getHistoryData } = useHistoryDataStore()
const filteredFood = getHistoryData()

const emit = defineEmits(
  ['updateSelectedFood']
)

function updateSelectedFood(data) {
  emit('updateSelectedFood', data, 'HistoryComponent');
}

</script>