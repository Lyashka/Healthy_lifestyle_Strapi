<template>
  <v-list 
    lines="one" 
    :height="height"
  > 
    <div 
      v-if="props.loader" 
      class="text-center"
    >
      <v-progress-circular  indeterminate/>
    </div>
    <v-row 
      no-gutters 
      v-for="(food, index) in props.filteredFood" 
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
      max-width="800"
      v-model="dialog"
    > 
      <v-card 
        :title="dataProductForSettings.name"
      >
          <v-card-item>
            <v-text-field 
              prepend-icon="mdi-plus-minus-variant" 
              v-model="productWeight"
              type="number"
              @update:modelValue="updateDataForProduct"
    
            /> 
          </v-card-item>

          <v-row 
            no-gutters 
            class="text-center"
          >
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

          <v-row 
            no-gutters  
            class="text-center"
          >
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
            <v-spacer/>
            <v-btn
              text="Close"
              @click="closeSettings"
            />
            <v-btn
              text="Save"
              @click="saveSettings"
            />
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-list>
</template>

<script setup>

import { ref, onMounted, watch, computed } from 'vue'
import trimString  from '@/composables/trimString.js'

import { useDisplay } from 'vuetify'
 const { name } = useDisplay()

 const height = computed(() => {
    switch (name.value) {
      case 'xs': return 280
      case 'sm': return 380
      case 'md': return 480
      case 'lg': return 580
      case 'xl': return 680
      case 'xxl': return 780
      default: return 380
    }
  })
  

const dialog = ref(false)
const isSelectFocused = ref(false);

const props = defineProps({
  filteredFood: Array,
  loader: Boolean
})

const emit = defineEmits(
  ['updateSelectedFood']
  )

const selected = ref([]) 

const dataProductForSettings = ref({})
function openInfoProduct(food) {
  dialog.value = true
  dataProductForSettings.value = Object.assign({}, food)
  if (dataProductForSettings.value.productWeight) {
    productWeight.value = dataProductForSettings.value.productWeight
  }else{
    productWeight.value = 100
  }
}

const productWeight = ref(100)
function updateDataForProduct(newData) {

  let inputValue = newData > 0 ? newData : 100 
    props.filteredFood.forEach(el => {
      if (el.id == dataProductForSettings.value.id) { 
        dataProductForSettings.value.calories = `${((+trimString(el.calories) * inputValue) / el.productWeight).toFixed(1).replace(/\.0$/, '')} кКал`  
        dataProductForSettings.value.proteins = `${((+trimString(el.proteins) * inputValue) / el.productWeight).toFixed(1).replace(/\.0$/, '')} г` 
        dataProductForSettings.value.fats = `${((+trimString(el.fats) * inputValue) / el.productWeight).toFixed(1).replace(/\.0$/, '')} г`
        dataProductForSettings.value.carbs = `${((+trimString(el.carbs) * inputValue) / el.productWeight).toFixed(1).replace(/\.0$/, '')} г` 
      } 
    }); 
}
 
function saveSettings() { 
  props.filteredFood.forEach(el => {
    if (el.id == dataProductForSettings.value.id) {
      el.calories = dataProductForSettings.value.calories
      el.proteins = dataProductForSettings.value.proteins
      el.fats = dataProductForSettings.value.fats
      el.carbs = dataProductForSettings.value.carbs
      el.productWeight = +productWeight.value
    }

    selected.value.forEach(item => {
            if(el.id == item.id && el.name == item.name){
              item.calories = el.calories
              item.proteins = el.proteins
              item.fats = el.fats
              item.carbs = el.carbs
              item.productWeight = el.productWeight
          }
        })
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



watch(selected, () => {
  localStorage.setItem('selectedFoodForMeal', JSON.stringify(selected.value))
  emit('updateSelectedFood', selected.value);
})


onMounted(() => {
  if(localStorage.getItem('selectedFoodForMeal')) {

      selected.value = JSON.parse(localStorage.getItem('selectedFoodForMeal'))

      if (selected.value) {
          selected.value.forEach(item => { 
            props.filteredFood.forEach(el => {
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
    }
})

</script>

<style scoped lang="scss">
.hover-color:hover{
    background-color: lightgray;
  }
  .size-text{
    font-size: 18px;
  }
</style>