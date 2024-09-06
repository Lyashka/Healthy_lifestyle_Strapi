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

const  { myFoods, getMyFoods } = useMyFoodsDataStore()

const dialog = ref(false)
const filteredFood = ref(await getMyFoods())

const emit = defineEmits(
  ['updateSelectedFood']
  )

function setDialogAndFilteredFood(dialogStatus) {
  dialog.value = dialogStatus
  
}

function updateSelectedFood(data) {
  emit('updateSelectedFood', data, 'MyMealComponent');
}

watch(myFoods,async () => {
  filteredFood.value = await getMyFoods()
})

onMounted(async () => {
    filteredFood.value = (await getMyFoods()).reverse()
})
</script>