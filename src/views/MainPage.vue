<template>
  <div class="mx-auto ">
    <v-container>
    <v-row  style="display: flex; flex-wrap: wrap;"> 
      <v-col>
        <v-card 
          max-width="800px" 
          min-width="300px" 
          min-height="500px" 
          class="mx-auto" 
          style="background-color:rgb(228,228,228);"
          elevation="4"
          > 
          <v-row no-gutters class="d-flex align-center mb-3" >
            <v-col class="d-flex flex-wrap">
               <v-progress-linear
                  rounded="lg" 
                  class="mx-auto ml-1"
                  color="#228B22" 
                  v-model="progressLinerValue" 
                  height="30"   
                >
                  {{ myCalories }} / {{ getPersonalization().needingCalories }}
                </v-progress-linear>
            </v-col>
            <v-col>
              <SelectDate class="text-center align-center"/> 
            </v-col>
            <v-col v-if="!isNarrowScreen">
            </v-col>
          </v-row>

          <v-expansion-panels>
            <v-expansion-panel v-for="ration in rations" :key="ration.id">
              <v-expansion-panel-title>
                <v-row>
                  <v-col cols="4">
                    {{ ration.name }}
                  </v-col>
                  <v-col cols="3">
                    кКал: 
                  </v-col>
                  <v-col cols="3">
                    {{ getSummCalories(ration.id) }} 
                  </v-col>
                </v-row>
                <!-- ______________ -->
              </v-expansion-panel-title>
              <v-expansion-panel-text >
                <MenuSelectFoods :ration="ration"/>
                <div v-if="ration.id == 1">
                  <div v-for="item in data.breakfast" :key="item.id">
                    <v-row>
                      <v-col cols="5">
                        {{ item.name }}
                      </v-col>
                      <v-col cols="5">
                        {{ item.calories }}
                      </v-col>
                    
                      <v-col cols="auto">
                        <v-btn 
                          variant="text" 
                          density="compact" 
                          icon="mdi-close"
                          @click="removePositionFromRation(data.date, ration.id, item.id)"
                        />
                      </v-col>
                    </v-row> 
                    <v-divider :thickness="2" class="mb-5"></v-divider>
                  </div>
                </div>

                <div v-if="ration.id == 2">
                  <div v-for="item in data.lunch" :key="item.id">
                    <v-row>
                      <v-col cols="5">
                        {{ item.name }}
                      </v-col>
                      <v-col cols="5">
                        {{ item.calories }}
                      </v-col>
                      <v-col cols="auto">
                        <v-btn 
                          variant="text" 
                          density="compact" 
                          icon="mdi-close"
                          @click="removePositionFromRation(data.date, ration.id, item.id)"
                        />
                      </v-col>
                    </v-row> 
                    <v-divider :thickness="2" class="mb-5"></v-divider>
                  </div>
                  
                </div>

                <div v-if="ration.id == 3">
                  <div v-for="item in data.dinner" :key="item.id">
                    <v-row>
                      <v-col cols="5">
                        {{ item.name }}
                      </v-col>
                      <v-col cols="5">
                        {{ item.calories }}
                      </v-col>
                      <v-col cols="auto">
                        <v-btn 
                          variant="text" 
                          density="compact" 
                          icon="mdi-close"
                          @click="removePositionFromRation(data.date, ration.id, item.id)"
                        />
                      </v-col>
                    </v-row>
                    <v-divider :thickness="2" class="mb-5"></v-divider>
                  </div>
                </div> 
              </v-expansion-panel-text> 
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>

      <v-col>
        <v-card 
          max-width="800px" 
          min-width="300px" 
          min-height="250px" 
          class="mx-auto" 
          style="background-color:rgb(228,228,228);"
          elevation="4"
        >
          <v-card-title>
            <v-row>
              <v-col>
                Ваши данные
              </v-col>
              <v-col cols="2">
                <v-btn 
                  size="x-small" 
                  icon="mdi-pencil" 
                  @click="openMenuPersonalization"
                />
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col >
                Возраст:
              </v-col>
              <v-col>
                {{ age }}
              </v-col>
            </v-row>
            <v-row>
              <v-col >
                Рост:
              </v-col>
              <v-col>
                {{ height }} см 
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Вес:
              </v-col>
              <v-col>
                {{ weight }} кг
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Дневная норма калорий:
              </v-col>
              <v-col>
                {{ needingCalories }} кКал
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Активность:
              </v-col>
              <v-col>
                {{ activity }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> 
  </v-container>
  </div>
</template>

<script setup>
import SelectDate from '../components/SelectDate.vue'; 
import MenuSelectFoods from '../components/MenuSelectFoods.vue'

import { ref, computed, onMounted, watch } from 'vue'

import food_rations from '../data/food_rations.json'

import { usePersonalizationDataStore } from '@/stores/personalizationData';
const personalizationDataStore = usePersonalizationDataStore()
const { getPersonalization, updatePersonalization,  setStatusMenuPersonalization, getStatusMenuPersonalization } = personalizationDataStore 

import { useCalendarDaysStore } from '../stores/calendarDays'  
const calendarDaysStore = useCalendarDaysStore()
const { calendarDays, getDataForDay, removePositionFromRation, calculateMyCalories, updateCalendarDays } = calendarDaysStore

import { useDisplay } from 'vuetify'
const { name } = useDisplay()
const isNarrowScreen = computed(() => name.value == 'xs')

const rations = ref([]);
const data = ref(getDataForDay())
const progressLinerValue = ref(0)

const age = computed(() => {
  return getPersonalization().age
})
const height = computed(() => {
  return getPersonalization().height
})
const weight = computed(() => {
  return getPersonalization().weight
})
const needingCalories = computed(() => {
  return getPersonalization().needingCalories
})
const activity = computed(() => {
  return getPersonalization().activity
})

const myCalories = computed(()=>{
  return calculateMyCalories()
})

const getRations = function() { 
  rations.value = food_rations
}

function openMenuPersonalization() {
  setStatusMenuPersonalization(true)
}

function getSummCalories(id){

  switch(id){
    case 1: return calculateSummCalories(data.value.breakfast)
    case 2: return calculateSummCalories(data.value.lunch)
    case 3: return calculateSummCalories(data.value.dinner)
  }
}

function calculateSummCalories(value) {
  return value ? value.reduce((acc, curr) => acc += trimString(curr.calories), 0).toFixed(1).replace(/\.0$/, '') : 0
}

function trimString(value) {
  const cleanedStr = value.replace(',', '.').replace(/\s/g, '') 
  return parseFloat(cleanedStr)
}

watch(
  () => calendarDaysStore.dataForDay, (newValue) => {
      data.value = newValue
  }
)

watch(calendarDays, () => {
  data.value = getDataForDay()
})


watch(myCalories, ()=>{
  progressLinerValue.value = +calculateMyCalories() * 100 / +getPersonalization().needingCalories
})

onMounted(() => {

  getRations()

  if(localStorage.getItem('personalization')){
    updatePersonalization(JSON.parse(localStorage.getItem('personalization')))
  }
  
  if(localStorage.getItem('calendarDays')){
      updateCalendarDays(JSON.parse(localStorage.getItem('calendarDays')))
      progressLinerValue.value = +calculateMyCalories() * 100 / +getPersonalization().needingCalories
  }
})

</script>
 