<template>
  <v-form 
    fast-fail 
    @submit.prevent
  >
    <v-card 
      min-height="500"
    >
      <v-card-title>
        Добавить новое блюдо/напиток
      </v-card-title> 
      <v-card-text class="pa-0">
        <v-text-field
          type="string"
          label="Название"
          v-model="nameFood"
          :rules="[commonRules.checkStringName]"
        />
        <v-text-field
          type="number"
          label="г/мл"
          v-model="productWeight"
          :rules="[commonRules.checkNumber]"
        />
        <v-text-field
          type="number"
          label="Калории"
          v-model="calories"
          :rules="[commonRules.checkNumber]"
        />
        <v-text-field
          type="number"
          label="Белок"
          v-model="proteins"
          :rules="[commonRules.checkNumber]"
        />
        <v-text-field
          type="number"
          label="Жиры"
          v-model="fats"
          :rules="[commonRules.checkNumber]"
        />
        <v-text-field
          type="number"
          label="Углеводы"
          v-model="carbs"
          :rules="[commonRules.checkNumber]"
        />
      </v-card-text> 
      <template #actions>
        <v-btn 
          class="ms-auto"
          text="Назад"
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
</template>

<script setup>
import { ref, computed } from 'vue'
import commonRules from '@/composables/commonValidators'
import { useMyFoodsDataStore } from '@/stores/myFoodsData'

const props = defineProps({
  foodBase: Array
})

const emit = defineEmits(
['setDialogAndFilteredFood'],
)
  
const { addMyFoods, getMyFoods, searchDuplicatesMyFood } = useMyFoodsDataStore() 

const nameFood = ref('')
const productWeight = ref(100)
const calories = ref('') 
const proteins = ref('')
const fats = ref('')
const carbs = ref('') 

const filteredFood = ref([])

const disableBtnSaveMyFood = computed(() => {
  const filterStatus = searchDuplicatesMyFood(nameFood.value); 
  return filterStatus || calories.value == '' || proteins.value == '' || fats.value == '' || carbs.value == '' || nameFood.value == ''
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

  if(props.foodBase){
    filteredFood.value = [...getMyFoods(), ...props.foodBase]
  }
  
  productWeight.value = 100
  clearForm()
  emit('setDialogAndFilteredFood', false,  filteredFood.value)
}

function closeMenuAddMyFood() {
  if(props.foodBase){
    filteredFood.value = [...getMyFoods(), ...props.foodBase]
  }  
  clearForm()
  productWeight.value = 100
  emit('setDialogAndFilteredFood', false, filteredFood.value)
}

function clearForm() {
  nameFood.value = ''
  productWeight.value = 100
  calories.value = '' 
  proteins.value = ''
  fats.value = ''
  carbs.value = ''
}

</script>