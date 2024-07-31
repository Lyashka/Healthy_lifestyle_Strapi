<template>
  <div>
    <div class="text-center pa-1"> 
      <v-btn 
        color = "rgba(34, 139, 34, 0.7)"
        icon="mdi-plus" 
        size="small"  
        @click="dialog = true"
      />
    </div>
  
    <v-dialog
      v-model="dialog"
      width="500"
    >
    <FormAddNewFood @setDialogAndFilteredFood="setDialogAndFilteredFood"/>
    </v-dialog>
    
    <FoodItem 
      :filteredFood="filteredFood" 
      @updateSelectedFood="updateSelectedFood" 
    />
  </div>
</template> 

<script setup>
import { ref, onMounted, watch } from 'vue' 

import FoodItem from './FoodItem.vue';
import FormAddNewFood from '../FormAddNewFood.vue';

import { useMyFoodsDataStore } from '@/stores/myFoodsData' 
const myFoodsDataStore = useMyFoodsDataStore() 
const { myFoods, getMyFoods, updateMyFood } = myFoodsDataStore

const dialog = ref(false)

const filteredFood = ref(getMyFoods())

function setDialogAndFilteredFood(dialogStatus) {
  dialog.value = dialogStatus
  
}

const emit = defineEmits(
  ['updateSelectedFood']
  )

function updateSelectedFood(data) {
  emit('updateSelectedFood', data);
}

watch(myFoods, () => {
  filteredFood.value = getMyFoods()
})

onMounted(() => {
  if(localStorage.getItem('myFoods')) {
    updateMyFood( JSON.parse(localStorage.getItem('myFoods')) )
    filteredFood.value = getMyFoods()
  }
})
</script>