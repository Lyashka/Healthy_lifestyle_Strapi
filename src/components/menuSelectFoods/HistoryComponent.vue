<template>
   <div v-if="getHistoryData().length == 0">История пуста</div>
   <FoodItem :showFoods="getHistoryData()" @updateSelectedFood="updateSelectedFood"/>
</template>

<script setup>
import { useHistoryDataStore } from '@/stores/historyData.js'
import FoodItem from './FoodItem.vue';

const hstoryDataStore = useHistoryDataStore()
const { getHistoryData } = hstoryDataStore

const emit = defineEmits(
  ['updateSelectedFood']
  )

function updateSelectedFood(data) {

  emit('updateSelectedFood', data);
}

</script>

<style>

</style>