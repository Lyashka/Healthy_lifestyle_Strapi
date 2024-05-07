<template>
  <v-app>
    <v-app-bar>  
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Application Bar</v-app-bar-title>
   
    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>
  
      <v-btn icon="mdi-magnify"></v-btn>
  
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
  
  <v-main>
    <RouterView />
  </v-main>
  
  </v-app>  
  
      <!-- <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
      </nav> -->
  </template>

<script setup> 
import { RouterView } from 'vue-router'
// import SideNavigationMenu from '@/components/SideNavigationMenu.vue';
</script>

<style scoped>

</style>
