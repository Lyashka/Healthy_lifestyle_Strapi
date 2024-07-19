<template>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card 
      min-width="350"
      prepend-icon="mdi-account"
      title="Персонализация"
      text="Введите свои данные"
    >
      <v-card-text>
        <v-text-field
          type="number"
          v-model="age"
          label="Возраст"
        />
        <v-text-field
          type="number"
          v-model="height"
          label="Рост"
        />
        <v-text-field
          type="number"
          v-model="weight"
          label="Вес"
        />
        <v-radio-group 
          inline 
          v-model="gender"
          label="Пол"
        >
          <v-radio label="М" value="1"></v-radio>
          <v-radio label="Ж" value="2"></v-radio>
        </v-radio-group>
        <v-select
          v-model="activity"       
          label="Уровень активности"
          :items="listItemsForSelect"
        />
      </v-card-text> 
      <template v-slot:actions>
        <v-btn
          text="Назад"
          @click="closePersonalization"
        />
        <v-btn
          class="ms-auto"
          text="Ok"
          :disabled="disableBtnSaveMyFood"
          @click="savePersonalization"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

import { usePersonalizationDataStore } from '@/stores/personalizationData';
const personalizationDataStore = usePersonalizationDataStore()
const { updatePersonalization, setStatusMenuPersonalization } = personalizationDataStore 

const dialog = ref(true)

const height = ref(null)
const weight = ref(null)
const age = ref(null)
const gender = ref(null)
const activity = ref(null)

const needingCalories = ref(0)

const listItemsForSelect = [
  {
    title : 'Минимальная активность', 
    props: {
      subtitle: 'Сидячая работа, не требующая значительных физических нагрузок'
    }
  },
  {
    title : 'Слабый уровень активности', 
    props: {
      subtitle: 'Интенсивные упражнения не менее 20 минут один-три раза в неделю'
    }
  },
  {
    title : 'Умеренный уровень активности', 
    props: {
      subtitle: 'Интенсивная тренировка не менее 30-60 мин три-четыре раза в неделю'
    }
  },
  {
    title : 'Тяжелая или трудоемкая активность', 
    props: {
      subtitle: 'Интенсивные упражнения и занятия спортом 5-7 дней в неделю'
    }
  },
  {
    title : 'Экстремальный уровень', 
    props: {
      subtitle: 'Включает чрезвычайно активные и/или очень энергозатратные виды деятельности'
    }
  }
]

function savePersonalization() {
  calculateCalories()
  dialog.value = false
  setStatusMenuPersonalization(false)
}

function closePersonalization() {
  dialog.value = false
  setStatusMenuPersonalization(false)
}

function calculateCalories() {
    if (gender.value == 1) {
      needingCalories.value = Math.round((10 * +weight.value + 6.25 * +height.value - 5 * +age.value + 5) * getActivityParameter()) 

    }else if(gender.value == 2){ 
      needingCalories.value = Math.round((10 * +weight.value + 6.25 * +height.value - 5 * +age.value - 161) * getActivityParameter())
    } 
    const newPerson = {
      height: height.value,
      weight: weight.value,
      age: age.value,
      gender: gender.value,
      activity: activity.value,
      needingCalories: needingCalories.value
    }
    updatePersonalization(newPerson)
}

function getActivityParameter() {
    let parameterValue = 0
    switch (activity.value) {
        case 'Минимальная активность':
            parameterValue = 1.2
            break;
        case 'Слабый уровень активности':
            parameterValue = 1.375
            break;

        case 'Умеренный уровень активности':
            parameterValue = 1.55
            break
        
        case 'Тяжелая или трудоемкая активность':
            parameterValue = 1.7
            break

        case 'Экстремальный уровень':
            parameterValue = 1.9
            break

        default:
            break;
    }
    return parameterValue
}

const disableBtnSaveMyFood = computed(() => {
  return height.value == null || weight.value == null || age.value == null || gender.value == null || activity.value == null   
 })

</script>

<style>

</style>