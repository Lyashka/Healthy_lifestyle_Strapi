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
  <FoodItem :showFoods="showFoods" :loader="loader" @updateSelectedFood="updateSelectedFood"/>
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

const showFoods = ref([])
const selected = ref([]) 

onMounted(async () => {
  foodBase.value = props.foodBase


  if(localStorage.getItem('showFoods')) {
    showFoods.value = JSON.parse(localStorage.getItem('showFoods'))
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

    showFoods.value = [...filteredMyFoods, ...filteredAllFoods]

    if (selected) {
        selected.value.forEach(item => {
          showFoods.value.forEach(el => {
            if(el.id == item.id && el.name == item.name){
              el.calories = item.calories
              el.proteins = item.proteins
              el.fats = item.fats
              el.carbs = item.carbs
              el.productWeight = item.productWeight
          }
          })
         
        })
      }
    localStorage.setItem('showFoods', JSON.stringify(showFoods.value))
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
          showFoods.value.forEach(el => {
            if(el.id == item.id && el.name == item.name){
              el.calories = item.calories
              el.proteins = item.proteins
              el.fats = item.fats
              el.carbs = item.carbs
              el.productWeight = item.productWeight
            }
          })
        })
    }
})



</script>

