<template>
  <v-app>
    <v-app-bar>  
    <v-app-bar-title>Healthy Lifestyle</v-app-bar-title>
   
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
    <Personalization v-if="statusMenu"/>
    <RouterView />
  </v-main>
  
  </v-app>  
  </template>

<script setup> 
import { RouterView, RouterLink } from 'vue-router'
import { onMounted, ref, computed } from 'vue'

import Personalization from './components/Personalization.vue';

import { usePersonalizationDataStore } from '@/stores/personalizationData';
const personalizationDataStore = usePersonalizationDataStore()
const { setStatusMenuPersonalization, getStatusMenuPersonalization } = personalizationDataStore 

const statusMenu = computed(() => {
  return getStatusMenuPersonalization()
})
onMounted(() => {
  if(localStorage.getItem('personalization')){
    setStatusMenuPersonalization(false)
  }else{
    setStatusMenuPersonalization(true)
  }
})

</script>

<style lang="scss">
.closeStyle{
  text-decoration: none;
  color: inherit;
}


</style>
