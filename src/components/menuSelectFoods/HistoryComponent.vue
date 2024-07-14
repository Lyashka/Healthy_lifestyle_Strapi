<template>
  <div v-if="showFoods.length == 0">История пуста</div>
  <FoodItem :showFoods="showFoods" @updateSelectedFood="updateSelectedFood"/>
</template>

<script setup>

import { useHistoryDataStore } from '@/stores/historyData.js'
import FoodItem from './FoodItem.vue';

const hstoryDataStore = useHistoryDataStore()
const { getHistoryData } = hstoryDataStore

const showFoods = getHistoryData()

const emit = defineEmits(
  ['updateSelectedFood']
  )

function updateSelectedFood(data) {

  emit('updateSelectedFood', data);
}

</script>

<style>

</style>