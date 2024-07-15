<template>
  <v-card 
    class="guide-container"  
    elevation="4" 
    style="background-color:rgb(228,228,228);"
    >
      <v-card-text class="guide-container-header">
      <v-text-field 
        block
        label="Введите продукт" 
        variant="solo-inverted"
        append-inner-icon="mdi-magnify"
        type="input"
        v-model="searchName"
        class="pr-1"
        @input="inputValueSelectFood($event.target.value)"
      />

    <div class="text-center pl-1"> 
      <v-btn height="73%" @click="dialog = true">Добавить продукт</v-btn>
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
  </v-card-text>
   
  <div v-if="loader" class="text-center">
    <v-progress-circular  indeterminate></v-progress-circular>
  </div>
  <v-data-table
    :headers="headers"
    :items="showFoods"
    height="700"
    item-value="name"  
  >
    <template #item.actions="{ item }">
      <v-btn  
        variant="text"
        v-if="item.canDelete"
        icon
        x-small
        @click="deleteItem(item)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import food_base from '../data/food_base.json'
import { debounce } from 'lodash'
import commonRules from '@/composables/commonValidators'

import { useMyFoodsDataStore } from '@/stores/myFoodsData' 
const myFoodsDataStore = useMyFoodsDataStore() 
const { addMyFoods, getMyFoods, filterMyFoods, searchDuplicatesMyFood, updateMyFood, removeMyFoods } = myFoodsDataStore


const foodBase = ref([])
const searchName = ref('')
const loader = ref(false)

const dialog = ref(false)
const nameFood = ref('')
const productWeight = ref(100)
const calories = ref('') 
const proteins = ref('')
const fats = ref('')
const carbs = ref('')

const showFoods = ref([])

const headers = [
    { title: 'Название', align: 'start', sortable: false, key: 'name' },
    { title: 'Ккал', align: 'end', sortable: false, key: 'calories' },
    { title: 'Белок', align: 'end', sortable: false, key: 'proteins' },
    { title: 'Жиры', align: 'end', sortable: false, key: 'fats' },
    { title: 'Углеводы', align: 'end', sortable: false, key: 'carbs' },
    { text: 'Actions', align: 'center', value: 'actions', sortable: false },
]     
    
const inputValueSelectFood = (value) =>{
  loader.value = true
  selectFood(value)
}
  
const selectFood = debounce((value) => {
   
  const myFood = getMyFoods()
  if (value){

    const filteredAllFoods = filteredFoods(value).map((food, index) => ({
      ...food,
      productWeight: 100, 
      id: index + 1,
    }))

    const filteredMyFoods = filterMyFoods(value)

    showFoods.value = [...filteredMyFoods, ...filteredAllFoods]

    localStorage.setItem('showFoods', JSON.stringify(showFoods.value))
    console.log(showFoods.value);
    loader.value = false
  }
  else{
    showFoods.value = [...myFood, ...foodBase.value]
    loader.value = false
  }
}, 1000)
 
function filteredFoods(value)  {
        return foodBase.value.filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase()) 
          )
}
 

const disableBtnSaveMyFood = computed(() => { 
  const filterStatus = searchDuplicatesMyFood(nameFood.value)
  return  filterStatus || calories.value == '' || proteins.value == '' || fats.value == '' || carbs.value == '' || nameFood.value == ''
})

function saveMyFood() {
  const newFood = {
    name: nameFood.value,
    productWeight: productWeight.value,
    calories: `${calories.value} кКал`,
    proteins: `${proteins.value} г`,
    fats: `${fats.value} г`, 
    carbs: `${carbs.value} г`
  }

  addMyFoods(newFood)

  showFoods.value = [...getMyFoods(), ...foodBase.value]
  productWeight.value = 100

  clearForm()
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

function deleteItem(value){
    removeMyFoods(value.id)
    showFoods.value = [...getMyFoods(), ...foodBase.value]
}

onMounted(async () => {
  foodBase.value = food_base
  if(localStorage.getItem('myFoods')) {
    updateMyFood( JSON.parse(localStorage.getItem('myFoods')) )
  }
  showFoods.value = [...getMyFoods(), ...foodBase.value]
})

</script>

<style lang="scss" scoped>

.guide-container{
  margin: auto;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  
  min-width: 300px;
  max-width: 1500px;
}
.guide-container-header{
  display: flex;
}

</style>