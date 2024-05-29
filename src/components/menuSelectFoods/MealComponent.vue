<template>
   <!-- <div> -->
    <v-text-field 
        block
        label="Label" 
        variant="solo-inverted"
        append-inner-icon="mdi-magnify"
        type="input"
        v-model="searchName"
     
        ></v-text-field>
        <ul>
      <li v-for="(food, index) in filteredFoods" :key="index">
        {{ food.name }}
      </li>
    </ul>
    <!-- {{ ration }}
  </div> -->
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import getFoodBase from '@/composables/requestGetFoodBase.js'
defineProps({
    ration: Object
})
 
const searchName = ref('')
const foodBase = ref([]);
//    @input="searchFoods($event.target.value)" 
// async function searchFoods(value) {
//     foodBase.value = await getFoodBase()
// // console.log(filteredFoods.value); 
// // getRations()
// }
onMounted(async () => {
  foodBase.value = await getFoodBase()
  console.log(foodBase.value);
})


const filteredFoods = computed(() => {
    console.log(foodBase.value[0]); //  foodBase.value[0].name не находит????
        return foodBase.value.filter(item => {
            item.name.toLowerCase().includes(searchName.value.toLowerCase()) 
        })
    })
</script>

<style>

</style>