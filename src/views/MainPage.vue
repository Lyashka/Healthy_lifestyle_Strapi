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
          <SelectDate/>
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
                <!-- <v-row no-gutters>
                  <v-col v-if="item.proteins != undefined" class="text-caption " cols="2">
                    Б- {{item.proteins}} 
                  </v-col>
                  <v-col v-if="item.fats != undefined" class="text-caption" cols="2">
                    Ж- {{item.fats}} 
                  </v-col>
                  <v-col v-if="item.carbs != undefined" class="text-caption" cols="2">
                    У- {{item.carbs}}  
                  </v-col>
                  <v-col v-else class="text-caption" cols="12">
                    Нет данных БЖУ
                  </v-col>
                </v-row> -->
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

import { ref } from 'vue'

//Конструкция для получения данных из json !!! В функцию ее обернуть для async
import getFoodRations from '../composables/requestGetFoodRatons'
const rations = ref([]);
const getRations = async function() { 
  rations.value = await getFoodRations()
}
getRations()


import { useCalendarDaysStore } from '../stores/calendarDays' 
import { watch } from 'vue'  
const calendarDaysStore = useCalendarDaysStore()
const { calendarDays, getDataForDay, dataForDay, getTargetDate, removePositionFromRation } = calendarDaysStore

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

</script>
 