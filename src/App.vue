<template>
  <v-app>
    <v-app-bar>  
    <v-app-bar-title>Bar</v-app-bar-title>
   
    <template v-slot:append>
      <RouterLink class="closeStyle" to="/">
        <v-btn >Главная</v-btn>
      </RouterLink>
      <RouterLink class="closeStyle" to="/Statistics">
        <v-btn variant="text">Статистика</v-btn>
      </RouterLink>
      <RouterLink class="closeStyle" to="/Guide">
        <v-btn >Справочник</v-btn>
      </RouterLink>
    </template>
  </v-app-bar>
  
  <v-main>
    <RouterView />
  </v-main>
  
  </v-app>  
  </template>

<script setup> 
import { RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'

import { useCalendarDaysStore } from './stores/calendarDays'
// const calendarDaysStore = useCalendarDaysStore()
// const { calendarDays } = calendarDaysStore
// console.log(calendarDays); 




</script>

<style scoped lang="scss">
.closeStyle{
  text-decoration: none;
  color: inherit;
}
</style>
