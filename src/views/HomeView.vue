<template>
  <div class="mx-auto">
    <v-container class="bg-surface-variant">
    <v-row no-gutters> 
      <v-col > 
        <v-card max-width="500px" min-width="250px" height="250px" class="mx-auto" variant="outlined">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, labore fugiat! Blanditiis eum modi pariatur consequuntur rem vitae enim velit iure obcaecati exercitationem deserunt, tenetur harum labore minima ea et.</v-card>
        <v-card max-width="500px" min-width="250px" height="250px" class="mx-auto" variant="outlined">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, cupiditate pariatur nostrum, quos dolores consectetur veritatis qui nulla optio minima, vero explicabo tenetur adipisci reiciendis! Nesciunt eveniet nam eaque illo.</v-card>
    </v-col>
 
      <v-col>
        <v-card max-width="500px" min-width="300px" height="500px" class="mx-auto" variant="outlined"> 
          <SelectDate/>
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
import SelectDate from '@/components/SelectDate.vue'; 
 
 
</script>
 