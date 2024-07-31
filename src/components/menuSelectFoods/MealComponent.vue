<template>
  <v-text-field 
    block
    label="Введите продукт" 
    variant="solo-inverted"
    append-inner-icon="mdi-magnify"
    type="input"
    v-model="searchName"
    @input="inputValueSelectFood($event.target.value)"
  />
  <FoodItem 
    :filteredFood="filteredFood" 
    :loader="loader" 
    @updateSelectedFood="updateSelectedFood"
  />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { debounce } from 'lodash'

import FoodItem from './FoodItem.vue';

import { useMyFoodsDataStore } from '@/stores/myFoodsData' 

const myFoodsDataStore = useMyFoodsDataStore() 
const { filterMyFoods } = myFoodsDataStore

const props = defineProps({
  foodBase: Array
})

const searchName = ref('')
const foodBase = ref([])
const loader = ref(false)

const filteredFood = ref([])
const selected = ref([]) 

onMounted(async () => {
  foodBase.value = props.foodBase

  if(localStorage.getItem('filteredFood')) {
    filteredFood.value = JSON.parse(localStorage.getItem('filteredFood'))[1]
    searchName.value = JSON.parse(localStorage.getItem('filteredFood'))[0]
  }
})

const inputValueSelectFood = (value) =>{
  loader.value = true
  selectFood(value)
}

const selectFood = debounce((value) => {
  if (value){
    const filteredAllFoods = filteredFoods(value).map((food, index) => ({
      ...food,
      productWeight: 100, 
      id: index + 1,
    }))

    const filteredMyFoods = filterMyFoods(value) 

    filteredFood.value = [...filteredMyFoods, ...filteredAllFoods]

    if (selected) {
      selected.value.forEach(item => {
        const foundFood = filteredFood.value.find(food => food.id === item.id)
        if(foundFood){
          foundFood.calories = item.calories
          foundFood.proteins = item.proteins
          foundFood.fats = item.fats
          foundFood.carbs = item.carbs
          foundFood.productWeight = item.productWeight
        }
      })
    }
    localStorage.setItem('filteredFood', JSON.stringify([searchName.value, filteredFood.value]))
    loader.value = false
  }
  else{
    filteredFood.value = []
    loader.value = false
  }
}, 1000)

function filteredFoods(value)  {
        return foodBase.value.filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase()) 
          )
}

const emit = defineEmits(
  ['updateSelectedFood']
  )

function updateSelectedFood(data) {
  selected.value = data
  emit('updateSelectedFood', data);
}

watch(selected, () => {
  if (selected) {
    selected.value.forEach(item => {
      const foundFood = filteredFood.value.find(food => food.id === item.id)
      if(foundFood){
        foundFood.calories = item.calories
        foundFood.proteins = item.proteins
        foundFood.fats = item.fats
        foundFood.carbs = item.carbs
        foundFood.productWeight = item.productWeight
      }
    })
  }
})

</script>

