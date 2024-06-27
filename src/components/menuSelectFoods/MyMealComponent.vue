<template>
   <div >
    <div class="text-center pa-1"> 
      <v-btn icon="mdi-plus" size="small"  @click="dialog = true"/>
    </div>
   
    <v-dialog
       v-model="dialog"
       width="500"
     >
     <v-form fast-fail @submit.prevent>
       <v-card 
         min-height="500"
       >
       <v-card-title>
       Добавить новое блюдо/напиток
      </v-card-title> 
       <v-card-subtitle>
        subtitle
       </v-card-subtitle>
       <v-card-text class="pa-0">

          <v-text-field
            v-model="nameFood"
            :rules="[commonRules.checkStringName]"
            label="Название"
          />
          <v-text-field
            type="number"
            v-model="productWeight"
            :rules="[commonRules.checkNumber]"
            label="г/мл"
          />
          <v-text-field
            type="number"
            v-model="calories"
            :rules="[commonRules.checkNumber]"
            label="Калории"
          />
          <v-text-field
            type="number"
            v-model="proteins"
            :rules="[commonRules.checkNumber]"
            label="Белок"
          />
          <v-text-field
            type="number"
            v-model="fats"
            :rules="[commonRules.checkNumber]"
            label="Жиры"
          />
          <v-text-field
            type="number"
            v-model="carbs"
            :rules="[commonRules.checkNumber]"
            label="Углеводы"
          />

       </v-card-text> 
       <template v-slot:actions>
           <v-btn 
            class="ms-auto"
             text="Cancel"
             @click="closeMenuAddMyFood"
           />
           <v-btn
             text="Ok"
             type="submit"
             :disabled="disableBtnSaveMyFood"
             @click="saveMyFood"
           />
         </template>
       </v-card>
      </v-form>
     </v-dialog>

     <FoodItem :showFoods="showFoods" @updateSelectedFood="updateSelectedFood"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue' 

import FoodItem from './FoodItem.vue';

import { useMyFoodsDataStore } from '@/stores/myFoodsData' 
const myFoodsDataStore = useMyFoodsDataStore() 
const { myFoods, addMyFoods, getMyFoods, searchDuplicatesMyFood } = myFoodsDataStore

import commonRules from '@/composables/commonValidators'

const dialog = ref(false)

const showFoods = getMyFoods()

const nameFood = ref('')
const productWeight = ref(100)
const calories = ref('') 
const proteins = ref('')
const fats = ref('')
const carbs = ref('')

const disableBtnSaveMyFood = computed(() => { 
  const filterStatus = searchDuplicatesMyFood(nameFood.value)
  return  filterStatus || calories.value == '' || proteins.value == '' || fats.value == '' || carbs.value == '' || nameFood.value == ''
})

function saveMyFood() {
  const newFood = {
    id: myFoods[myFoods.length - 1] == undefined ? 1 : myFoods[myFoods.length - 1].id + 1,
    name: nameFood.value,
    productWeight: productWeight.value,
    calories: `${calories.value} кКал`,
    proteins: `${proteins.value} г`,
    fats: `${fats.value} г`, 
    carbs: `${carbs.value} г`
  }
  addMyFoods(newFood)
  clearForm()
  productWeight.value = 100
  dialog.value = false
}

function closeMenuAddMyFood() {
  clearForm()
  productWeight.value = 100
  dialog.value = false
}

function clearForm() {
   nameFood.value = ''
   productWeight.value = 100
   calories.value = '' 
   proteins.value = ''
   fats.value = ''
   carbs.value = ''
}

const emit = defineEmits(
  ['updateSelectedFood']
  )

function updateSelectedFood(data) {
  emit('updateSelectedFood', data);
}

</script>

<style>

</style>