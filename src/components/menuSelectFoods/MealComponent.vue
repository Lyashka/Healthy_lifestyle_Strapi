<template>
   <!-- <div> -->
    <v-text-field 
        block
        label="Введите продукт" 
        variant="solo-inverted"
        append-inner-icon="mdi-magnify"
        type="input"
        v-model="searchName"
        @input="selectFood($event.target.value)"
        ></v-text-field>
  
    <v-list lines="one">
      <v-row  v-for="(food, index) in showFoods" 
        :key="index"
        >
        <v-col>
          <v-list-item>
            <v-list-item-title> {{ food.name }} </v-list-item-title>
            <v-list-item-subtitle> {{ food.calories }} </v-list-item-subtitle>
            <!-- Б-${food.proteins} Ж-${food.fats} У-${food.carbs} -->
          </v-list-item> 
        </v-col>
        <v-col>
          <!-- <v-checkbox
          v-model="selected"
          label="John"
          value="John"
          /> -->
        </v-col>
        
      </v-row>
      
    </v-list>  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import getFoodBase from '@/composables/requestGetFoodBase.js'
defineProps({
    ration: Object
})
 
const searchName = ref('')
const foodBase = ref([]);

onMounted(async () => {
  foodBase.value = await getFoodBase()
  console.log(foodBase.value);
})

const showFoods = ref([])
function selectFood(value) {
  if (value){
    showFoods.value = filteredFoods(value)
  }
  else{
    showFoods.value = []
  }
}

function filteredFoods(value)  {
        return foodBase.value.filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase()) 
          )
}

</script>

<style>

</style>