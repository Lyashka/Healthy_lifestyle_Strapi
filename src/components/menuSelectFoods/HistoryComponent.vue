<template>
   <FoodItem :showFoods="historyData" @updateSelectedFood="updateSelectedFood"/>
</template>

<script setup>
import { useHistoryDataStore } from '@/stores/historyData.js'
import FoodItem from './FoodItem.vue';

const hstoryDataStore = useHistoryDataStore()
const { historyData } = hstoryDataStore

const emit = defineEmits(
  ['updateSelectedFood']
  )
  
function updateSelectedFood(data) {

  emit('updateSelectedFood', data);
}

</script>

<style>

</style>