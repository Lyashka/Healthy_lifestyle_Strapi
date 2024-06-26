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


<!-- __________________________________________ -->
<FoodItem :showFoods="showFoods" :loader="loader" @updateSelectedFood="updateSelectedFood"/>
<!-- <v-list lines="one" height="350">
      <div v-if="loader" class="text-center">
        <v-progress-circular  indeterminate></v-progress-circular>
      </div> 
      <v-row 
        no-gutters 
        v-for="(food, index) in showFoods" 
        :key="index"
        class="hover-color"
        @click="openInfoProduct(food)"
      > 
        <v-col >
          <v-list-item> 
            <v-list-item-title> {{ food.name }} </v-list-item-title>
            <v-list-item-subtitle> {{ food.calories }} </v-list-item-subtitle>
          </v-list-item> 
        </v-col>
        <v-col cols="auto">
          <v-checkbox
            v-model="selected"
            :value="food"
            @click.stop
          />
        </v-col>                        
      </v-row>

      <v-dialog 
        max-width="500"
        v-model="dialog"
      >
        <v-card :title="dataProductForSettings.name">
            <v-card-item>
              <v-text-field 
                prepend-icon="mdi-plus-minus-variant" 
                v-model="productWeight"
                type="number"
                @update:modelValue="updateDataForProduct"
                /> 
            </v-card-item>
            <v-row no-gutters class="text-center">
              <v-col class="ma-1 bg-grey" >
                <v-card-item >
                  <v-card-title> Калории </v-card-title>
                  <v-card-text  class="size-text">
                    {{ dataProductForSettings.calories }}
                  </v-card-text>
                 
                </v-card-item>
              </v-col>
              <v-col class="ma-1 bg-grey"> 
                <v-card-item>
                  <v-card-title> Белок </v-card-title>
                  <v-card-text class="size-text">
                    {{ dataProductForSettings.proteins }}
                  </v-card-text>
                </v-card-item>
              </v-col>
            </v-row>
            <v-row no-gutters  class="text-center">
              <v-col class="ma-1 bg-grey">
                <v-card-item>
                  <v-card-title> Жиры </v-card-title>
                  <v-card-text class="size-text">
                    {{ dataProductForSettings.fats }}
                  </v-card-text>
                </v-card-item>
              </v-col>
              <v-col class="ma-1 bg-grey">
                <v-card-item>
                  <v-card-title> Углеводы </v-card-title>
                  <v-card-text class="size-text">
                    {{ dataProductForSettings.carbs }}
                  </v-card-text>
                  
                </v-card-item>
              </v-col>
            </v-row>
           
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="Close"
                @click="closeSettings"
              ></v-btn>
              <v-btn
                text="Save"
                @click="saveSettings"
              ></v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
</v-list> -->

</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
// import getFoodBase from '@/composables/requestGetFoodBase.js'
import { debounce } from 'lodash'

import FoodItem from './FoodItem.vue';

import { useSelectedDataStore } from '@/stores/selectedData'
const selectedDataStore = useSelectedDataStore()
 const { addSelectedData, getSelectedData, clearSelectedData, getLengthSelectedData, clearLengthSelectedData } = selectedDataStore

const dialog = ref(false)

const props = defineProps({
  foodBase: Array
})

const emit = defineEmits(
  ['updateSelectedFood']
  )
  
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
    showFoods.value = filteredFoods(value).map((food, index) => ({
      ...food,
      productWeight: 100, 
      id: index + 1,
    }))
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
    // localStorage.setItem('lastRequest', JSON.stringify(value)) 

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

// const dataProductForSettings = ref({})
// function openInfoProduct(food) {
//   dialog.value = true
//   dataProductForSettings.value = Object.assign({}, food); // склонировали
//   if (dataProductForSettings.value.productWeight) {
//     productWeight.value = dataProductForSettings.value.productWeight
//   }else{
//     productWeight.value = 100
//   }
// }

// const productWeight = ref(100)
// function updateDataForProduct(newData) {

//   let inputValue = newData > 0 ? newData : 100
//   console.log(inputValue);  
//   console.log(productWeight.value);
//     showFoods.value.forEach(el => {
//       if (el.id == dataProductForSettings.value.id) { 
//         console.log(inputValue);
//         dataProductForSettings.value.calories = `${((+trimString(el.calories) * inputValue) / el.productWeight).toFixed(1).replace(/\.0$/, '')} кКал`  
//         dataProductForSettings.value.proteins = `${((+trimString(el.proteins) * inputValue) / el.productWeight).toFixed(1).replace(/\.0$/, '')} г` 
//         dataProductForSettings.value.fats = `${((+trimString(el.fats) * inputValue) / el.productWeight).toFixed(1).replace(/\.0$/, '')} г`
//         dataProductForSettings.value.carbs = `${((+trimString(el.carbs) * inputValue) / el.productWeight).toFixed(1).replace(/\.0$/, '')} г` 
//       } 
//     }); 
// }
 
// function saveSettings() { 
//   showFoods.value.forEach(el => {
//     if (el.id == dataProductForSettings.value.id) {
//       el.calories = dataProductForSettings.value.calories
//       el.proteins = dataProductForSettings.value.proteins
//       el.fats = dataProductForSettings.value.fats
//       el.carbs = dataProductForSettings.value.carbs
//       el.productWeight = +productWeight.value
//       // console.log(el); 
//     }

//     selected.value.forEach(item => {
//             if(el.id == item.id && el.name == item.name){
//               item.calories = el.calories
//               item.proteins = el.proteins
//               item.fats = el.fats
//               item.carbs = el.carbs
//               item.productWeight = el.productWeight
//           }
//         })
//   })
  
//   dataProductForSettings.value = {}
//   productWeight.value = 100 
//   dialog.value = false
// }

// function closeSettings() {
 
//   dataProductForSettings.value = {}
//   productWeight.value = 100 
//   dialog.value = false
// }
 
// function trimString(value) {
//   const cleanedStr = value.replace(',', '.').replace(/\s/g, '')
//   return parseFloat(cleanedStr);
// }

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

