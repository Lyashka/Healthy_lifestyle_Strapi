  <template>
    <div>
      <v-menu
        location="center"
        v-model="menu"
        :close-on-content-click="false"
      >
        <template #activator="{ props }">
          <v-btn
            prepend-icon="$calendar" 
            color="white"
            v-bind="props"
            :text="selectedDate.toLocaleDateString()"
          />  
        </template>
  
        <v-card min-height="300px">
          <v-date-picker 
            v-model="selectedDate" 
            hide-header
          />
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              variant="text" 
              text="OK"
              @click="saveDay"
            />
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
  </template>
  
  <script setup> 
  
  import {onMounted, ref} from 'vue'  
  import { useCalendarDaysStore } from '../stores/calendarDays'   

  const { editTargetDate } = useCalendarDaysStore()
  
  const menu = ref(false)
  const selectedDate = ref(new Date());
 
  function saveDay() {
    editTargetDate(selectedDate.value)
    menu.value = false
  }
  onMounted(() => {
    editTargetDate(selectedDate.value)
  })
  </script>