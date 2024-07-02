<template>
  <div class="mx-auto">
    <v-container class="bg-surface-variant">
    <v-row no-gutters> 
      <!-- <v-col > 
        <v-card max-width="500px" min-width="250px" height="250px" class="mx-auto" variant="outlined">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, labore fugiat! Blanditiis eum modi pariatur consequuntur rem vitae enim velit iure obcaecati exercitationem deserunt, tenetur harum labore minima ea et.</v-card>
        <v-card max-width="500px" min-width="250px" height="250px" class="mx-auto" variant="outlined">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, cupiditate pariatur nostrum, quos dolores consectetur veritatis qui nulla optio minima, vero explicabo tenetur adipisci reiciendis! Nesciunt eveniet nam eaque illo.</v-card>
    </v-col> -->
 
      <v-col>
        <v-card max-width="500px" min-width="300px" min-height="500px" class="mx-auto" variant="outlined"> 
        
          <v-row no-gutters class="d-flex align-center mb-3" >
            <v-col class="d-flex flex-wrap">
               <v-progress-linear
                  rounded="lg"
                  class="mx-auto ml-1"
                  color="#228B22" 
                  v-model="progressLinerValue" 
                  :height="30"
                 
             >{{ myCalories }} / {{ getPersonalization().needingCalories }}</v-progress-linear>
             <div class="py-auto"></div>
            </v-col>
            <v-col>
              <SelectDate class="text-center align-center"/> 
            </v-col>
           <v-col>

           </v-col>
            
          </v-row>
         
          <v-expansion-panels>
            <!-- в отдельный компонент вывести??? -->
            <v-expansion-panel v-for="ration in rations" :key="ration.id">
              <v-expansion-panel-title>
                <!-- информация на самой вкладке категории -->
                <v-row>
                  <v-col cols="4">
                    {{ ration.name }}
                  </v-col>
                  <v-col cols="3">
                    Калории: 
                  </v-col>
                  <v-col cols="3">
                    {{ getSummCalories(ration.id) }} 
                  </v-col>
                </v-row>
                <!-- ______________ -->
              </v-expansion-panel-title>
              <v-expansion-panel-text >

                <MenuSelectFoods :ration="ration"/>
              
                <!-- Элемент элемента списка категории "Завтрак" да и в целом для всего -->
                <!-- Может, if ration name = 'завтрак' передавай breackfast , хз чето-->
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
                
                <!-- ______________________________ -->
                
              </v-expansion-panel-text> 
            </v-expansion-panel>

          </v-expansion-panels>

        </v-card>
      </v-col>

      <v-col>
       <v-card max-width="500px" min-width="250px" height="250px" class="mx-auto" variant="outlined">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta facilis voluptatibus repellendus debitis ad ipsam in eum nihil, nisi numquam deserunt. Ipsa dicta deleniti fugiat sunt cumque, placeat consectetur qui.</v-card>
        <v-card max-width="500px" min-width="250px" height="250px" class="mx-auto" variant="outlined">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam aspernatur illo distinctio deleniti placeat nobis suscipit saepe eaque eos similique nostrum non cupiditate repellat enim est tenetur omnis, nam doloremque.</v-card>
      </v-col>
    </v-row> 
  </v-container>
   
   
  </div>
</template>

<script setup>
import SelectDate from '../components/SelectDate.vue'; 
import MenuSelectFoods from '../components/MenuSelectFoods.vue'

import { ref, computed, onMounted } from 'vue'

//Конструкция для получения данных из json !!! В функцию ее обернуть для async
import getFoodRations from '../composables/requestGetFoodRatons'
const rations = ref([]);
const getRations = async function() { 
  rations.value = await getFoodRations()
}
getRations()
 
import { usePersonalizationDataStore } from '@/stores/personalizationData';
const personalizationDataStore = usePersonalizationDataStore()
const { getPersonalization, updatePersonalization } = personalizationDataStore 

import { useCalendarDaysStore } from '../stores/calendarDays' 
import { watch } from 'vue'  
const calendarDaysStore = useCalendarDaysStore()
const { calendarDays, getDataForDay, dataForDay, getTargetDate, removePositionFromRation, calculateMyCalories, updateCalendarDays } = calendarDaysStore

const data = ref(getDataForDay())

watch(
  () => calendarDaysStore.dataForDay, (newValue) => {
      data.value = newValue
  }
)

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

watch(calendarDays, () => {
  data.value = getDataForDay()
})

const progressLinerValue = ref(0)
const myCalories = computed(()=>{
  return calculateMyCalories()
})
watch(myCalories, ()=>{
  progressLinerValue.value = +calculateMyCalories() * 100 / +getPersonalization().needingCalories
})

onMounted(() => {
  if(localStorage.getItem('personalization')){
    updatePersonalization(JSON.parse(localStorage.getItem('personalization')))
  }
  
  if(localStorage.getItem('calendarDays')){
    updateCalendarDays(JSON.parse(localStorage.getItem('calendarDays')))
  }
})

</script>
 