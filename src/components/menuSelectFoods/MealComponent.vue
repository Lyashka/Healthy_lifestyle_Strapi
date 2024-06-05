<template>
   <!-- <div> -->
    <v-text-field 
        block
        label="Введите продукт" 
        variant="solo-inverted"
        append-inner-icon="mdi-magnify"
        type="input"
        v-model="searchName"
        @input="inputValueSelectFood($event.target.value)"
        />
    <v-list lines="one" height="350">
      <div v-if="loader" class="text-center">
        <v-progress-circular  indeterminate></v-progress-circular>
      </div> 
      
      <v-row no-gutters v-for="(food, index) in showFoods" 
        :key="index"
        
        >
        <v-col >
          <v-list-item>
            <v-list-item-title> {{ food.name }} </v-list-item-title>
            <v-list-item-subtitle> {{ food.calories }} </v-list-item-subtitle>
            <!-- Б-${food.proteins} Ж-${food.fats} У-${food.carbs} -->
          </v-list-item> 
        </v-col>
        <v-col cols="auto">
          <v-checkbox
          v-model="selected"
          :value="food"
          />
        </v-col>
        
      </v-row>
      
    </v-list>  
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import getFoodBase from '@/composables/requestGetFoodBase.js'
import { debounce } from 'lodash'
defineProps({
    ration: Object
})
const emit = defineEmits(
  ['updateSelectedFood']
  )
 
const searchName = ref('')
const foodBase = ref([])
const loader = ref(false)
const selected = ref([]) 

onMounted(async () => {
  foodBase.value = await getFoodBase()
  // console.log(foodBase.value);
})

const showFoods = ref([])

const inputValueSelectFood = (value) =>{
  loader.value = true
  selectFood(value)
}

const selectFood = debounce((value) => {
  if (value){
    // console.log(value);
    showFoods.value = filteredFoods(value)
    loader.value = false
  }
  else{
    showFoods.value = []
    loader.value = false
  }

}, 1000)

function filteredFoods(value)  {
        return foodBase.value.filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase()) 
          )
}

watch(selected, () => {
  emit('updateSelectedFood', selected.value);
})


</script>

<style>

</style>