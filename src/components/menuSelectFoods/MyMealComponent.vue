<template>
   <div>
    <v-btn icon="mdi-plus" size="small" @click="dialog = true"/>
    <v-dialog
       v-model="dialog"
       width="500"
     >
       <v-card 
         min-height="500"
       >
       <v-card-title>
       Добавить новое блюдо/напиток
      </v-card-title> 
       <v-card-subtitle>
        subtitle
       </v-card-subtitle>
       <v-card-text class="pa-0">
          

        content
        
        
       </v-card-text> 
       <template v-slot:actions>
           <v-btn 
            class="ms-auto"
             text="Cancel"
             @click="closeMenuAddMyFood"
           />
           <v-btn
             
             text="Ok"
             @click="saveMyFood"
           />
         </template>
       </v-card>
     </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useMyFoodsDataStore } from '@/stores/myFoodsData' 
const myFoodsDataStore = useMyFoodsDataStore() 
const { myFoods } = myFoodsDataStore


const dialog = ref(false)

function saveMyFood() {

  dialog.value = false
}

function closeMenuAddMyFood() {

  dialog.value = false
}

</script>

<style>

</style>