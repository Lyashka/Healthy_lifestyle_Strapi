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
          <v-btn v-if="!isNarrowScreen" height="73%" @click="dialog = true">Добавить продукт</v-btn>
          <v-btn v-else icon="mdi-plus" @click="dialog = true"/>
        </div>
    
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <FormAddNewFood @setDialogAndShowFoods="setDialogAndShowFoods"  :foodBase="foodBase"/> 
        </v-dialog>
      </v-card-text>
   
    <div v-if="loader" class="text-center mb-2">
      <v-progress-circular  indeterminate :width="4"></v-progress-circular>
    </div>
    <div v-else class="mb-9"></div>
    <v-data-table 
      :headers="headers"
      :items="showFoods"
      height="700"
      item-value="name"
    >
      <template v-slot:item="{ item }">
        <tr @click="handleRowClick(item)">
          <td class="column-name">{{ item.name }}</td>
          <td class="text-center">{{ item.calories }}</td>
          <td v-if="!isNarrowScreen" class="text-center">{{ item.proteins }}</td>
          <td v-if="!isNarrowScreen" class="text-center">{{ item.fats }}</td>
          <td v-if="!isNarrowScreen" class="text-center">{{ item.carbs }}</td>
          <td class="text-center">
            <v-btn 
              variant="text"
              v-if="item.canDelete"
              icon="mdi-delete"
              x-small
              @click.stop="deleteItem(item)"  
            />
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-overlay 
      v-model="overlay"
      class="align-center justify-center"
      min-width="400"
      max-width="700"
    >
      <v-card> 
        <v-card-title>
          {{ foodInfo.name }}
        </v-card-title>
        <v-card-subtitle>
          На {{ foodInfo.productWeight ? foodInfo.productWeight : 100 }} г. продукта
        </v-card-subtitle>
        <v-card-text>
          <v-row no-gutters class="text-center">
            <v-col class="ma-1 bg-grey" >
              <v-card-item >
                <v-card-title> Калории </v-card-title>
                  <v-card-text  class="size-text">
                    {{ foodInfo.calories }}
                  </v-card-text> 
                </v-card-item>
              </v-col>
            <v-col class="ma-1 bg-grey"> 
              <v-card-item>
                <v-card-title> Белок </v-card-title>
                <v-card-text class="size-text">
                  {{ foodInfo.proteins }}
                </v-card-text>
              </v-card-item>
            </v-col>
          </v-row>

          <v-row no-gutters  class="text-center">
            <v-col class="ma-1 bg-grey">
              <v-card-item>
                <v-card-title> Жиры </v-card-title>
                <v-card-text class="size-text">
                  {{ foodInfo.fats }}
                </v-card-text>
              </v-card-item>
            </v-col>
            <v-col class="ma-1 bg-grey">
              <v-card-item>
                <v-card-title> Углеводы </v-card-title>
                <v-card-text class="size-text">
                  {{ foodInfo.carbs }}
                </v-card-text>    
              </v-card-item>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn
              text="Назад"
              @click="overlay = false"
            />
          </v-card-actions>
      </v-card>
    </v-overlay>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import food_base from '../data/food_base.json'
import { debounce } from 'lodash'

import FormAddNewFood from '@/components/FormAddNewFood.vue'

import { useMyFoodsDataStore } from '@/stores/myFoodsData' 
const myFoodsDataStore = useMyFoodsDataStore() 
const { getMyFoods, filterMyFoods, updateMyFood, removeMyFoods } = myFoodsDataStore

import { useDisplay } from 'vuetify'
const { name } = useDisplay()

const isNarrowScreen = computed(() => name.value == 'xs')

const foodBase = ref([])
const searchName = ref('')
const loader = ref(false)

const dialog = ref(false)

const showFoods = ref([])

const overlay = ref(false)
const foodInfo = ref({})

const headers = computed(() => {
  if(name.value == 'xs'){
    return [ 
      { title: 'Название', align: 'start', sortable: false, key: 'name' },
      { title: 'Ккал', align: 'center', sortable: false, key: 'calories' },
      { text: 'Actions', align: 'center', value: 'actions', sortable: false },
    ]
  }else{
    return [
      { title: 'Название', align: 'start', sortable: false, key: 'name' },
      { title: 'Ккал', align: 'center', sortable: false, key: 'calories' },
      { title: 'Белок', align: 'center', sortable: false, key: 'proteins' },
      { title: 'Жиры', align: 'center', sortable: false, key: 'fats' },
      { title: 'Углеводы', align: 'center', sortable: false, key: 'carbs' },
      { text: 'Actions', align: 'center', value: 'actions', sortable: false },
    ] 
  }
})    
    
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
    loader.value = false
  }
  else{
    showFoods.value = [...myFood, ...foodBase.value]
    loader.value = false
  }
}, 800)
 
function filteredFoods(value)  {
        return foodBase.value.filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase()) 
          )
}

function setDialogAndShowFoods(dialogStatus, newShowFoods) {
  dialog.value = dialogStatus
  showFoods.value = newShowFoods
}

function deleteItem(value){
    removeMyFoods(value.id)
    showFoods.value = [...getMyFoods(), ...foodBase.value]
}

function handleRowClick(item){
  if(isNarrowScreen.value){
    foodInfo.value = item
    overlay.value = true
  }
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
  .guide-container-header{
  display: flex;
}
}

.column-name{
  word-break: break-all;
}
</style>