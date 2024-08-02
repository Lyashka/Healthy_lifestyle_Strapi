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
      width="500"
      v-model="dialog"
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

const  { myFoods, getMyFoods, updateMyFood } = useMyFoodsDataStore() 

const dialog = ref(false)
const filteredFood = ref(getMyFoods())

const emit = defineEmits(
  ['updateSelectedFood']
  )

function setDialogAndFilteredFood(dialogStatus) {
  dialog.value = dialogStatus
  
}

function updateSelectedFood(data) {
  emit('updateSelectedFood', data, 'MyMealComponent');
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