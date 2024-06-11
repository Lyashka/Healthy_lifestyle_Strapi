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
<v-list lines="one" height="350">
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
                prepend-icon="$vuetify" 
                v-model="productWeight"
                type="number"
                @update:modelValue="updateDataForProduct"
                /> 
            </v-card-item> 
            <v-card-item>
              {{ dataProductForSettings.calories }}
            </v-card-item>
            <v-card-item>
              {{ dataProductForSettings.proteins }}
            </v-card-item>
            <v-card-item>
              {{ dataProductForSettings.fats }}
            </v-card-item>
            <v-card-item>
              {{ dataProductForSettings.carbs }}
            </v-card-item>
              
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

</v-list>
 <!-- _________________________________________ -->


    <!-- <v-list lines="one" height="350">
      <div v-if="loader" class="text-center">
        <v-progress-circular  indeterminate></v-progress-circular>
      </div> 
      <v-row 
        no-gutters 
        v-for="(food, index) in showFoods" 
        :key="index"
        class="hover-color"
        @click="openInfoProduct()"
        >
        <v-col >
          <v-list-item> 
            <v-list-item-title> {{ food.name }} </v-list-item-title>
            <v-list-item-subtitle> {{ food.calories }} </v-list-item-subtitle>
             Б-${food.proteins} Ж-${food.fats} У-${food.carbs} 
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
      
    </v-list>   -->
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import getFoodBase from '@/composables/requestGetFoodBase.js'
import { debounce } from 'lodash'

const dialog = ref(false)


// function closeDialog() {
//   dataProductForSettings.value = {}
//   isActive.value = false
// }

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
})

const showFoods = ref([])

const inputValueSelectFood = (value) =>{
  loader.value = true
  selectFood(value)
}

const selectFood = debounce((value) => {
  if (value){
    showFoods.value = filteredFoods(value).map((food, index) => ({
      ...food,
      id: index + 1,
    }))
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

const dataProductForSettings = ref({})
function openInfoProduct(food) {
  dialog.value = true
  dataProductForSettings.value = Object.assign({}, food); // склонировали
  if (dataProductForSettings.value.productWeight) {
    productWeight.value = dataProductForSettings.value.productWeight
  }else{
    productWeight.value = 100
  }
}

const productWeight = ref(100)
function updateDataForProduct(newData) {
  
  let inputValue = newData ? newData : 100
    showFoods.value.forEach(el => {
      if (el.id == dataProductForSettings.value.id) {

        dataProductForSettings.value.calories = `${(+trimString(el.calories) * inputValue)/100} кКал` 
        dataProductForSettings.value.proteins = `${(+trimString(el.proteins) * inputValue)/100} г` 
        dataProductForSettings.value.fats = `${(+trimString(el.fats) * inputValue)/100} г`
        dataProductForSettings.value.carbs = `${(+trimString(el.carbs) * inputValue)/100} г`
        console.log(dataProductForSettings.value);
      }
    });
}


function saveSettings() { 
  showFoods.value.forEach(el => {
    if (el.id == dataProductForSettings.value.id) {
      el.calories = dataProductForSettings.value.calories
      el.proteins = dataProductForSettings.value.proteins
      el.fats = dataProductForSettings.value.fats
      el.carbs = dataProductForSettings.value.carbs
      el.productWeight = +productWeight.value
      console.log(el);
    }
  })
  
  dataProductForSettings.value = {}
  productWeight.value = 100 
  dialog.value = false
}

function closeSettings() {
 
  dataProductForSettings.value = {}
  productWeight.value = 100 
  dialog.value = false
}



function trimString(value) {
  return value.toString().replace(/\D/g, '')
}

watch(selected, () => {
  emit('updateSelectedFood', selected.value);
})


</script>

<style scoped lang="scss">
  .hover-color:hover{
    background-color: lightgray;
  }
</style>