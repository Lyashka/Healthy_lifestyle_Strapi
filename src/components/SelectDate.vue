<template>
    <div class="text-center mt-5">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="center"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            prepend-icon="$calendar" 
            color="white"
            v-bind="props"
          >  
            {{ selectedDate.toLocaleDateString() }}
          </v-btn>
        </template>
  
        <v-card min-height="300px">
          <v-date-picker v-model="selectedDate"></v-date-picker>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text" 
              @click="menu = false"
            >
              OK
            </v-btn> 
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
  </template>
  
  <script setup> 
  import {ref, watch} from 'vue'     

  let menu = ref(false)
  
  let selectedDate = ref(new Date());



watch(selectedDate, () => {
 
    console.log(selectedDate.value);

});


  
  </script>

<style scoped lang="scss"></style>