<template>
<v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card 
        min-width="350"
        prepend-icon="mdi-account"
        title="Персонализация"
        text="Введите свои данные"
      >

      <v-card-text>
        <v-text-field
            type="number"
            v-model="age"
            label="Возраст"
          />
        <v-text-field
            type="number"
            v-model="height"
            label="Рост"
          />
          <v-text-field
            type="number"
            v-model="weight"
            label="Вес"
          />

          <v-radio-group 
            inline 
            v-model="radios"
            label="Пол"
           >
            <v-radio label="М" value="1"></v-radio>
            <v-radio label="Ж" value="2"></v-radio>
          </v-radio-group>
          <v-select
            v-model="selectedValue"       
            label="Уровень активности"
            :items="['Минимальная активность', 
                    'Слабый уровень активности', 
                    'Умеренный уровень активности', 
                    'Тяжелая или трудоемкая активность', 
                    'Экстремальный уровень'
                    ]"
           />
      </v-card-text>

        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="closePersonalization"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'


const dialog = ref(true)

const height = ref('')
const weight = ref('')
const age = ref('')
const radios = ref("")
const selectedValue = ref('')

const resultCalories = ref(0)

function closePersonalization() {
    calculateCalories()

    // dialog.value = false
    // localStorage.setItem('statusMenuPersonalization', JSON.stringify(dialog.value))
}

function calculateCalories() {
    if (radios.value == 1) {

        resultCalories.value = (10 * +weight.value + 6.25 * +height.value - 5 * +age.value + 5) * getActivityParameter() 
        console.log(resultCalories.value);

    }else if(radios.value == 2){ 
        // для женщин нужно прописать   
    } 
}

function getActivityParameter() {
    let parameterValue = 0
    switch (selectedValue.value) {
        case 'Минимальная активность':
            parameterValue = 1.2
            break;
        case 'Слабый уровень активности':
            parameterValue = 1.375
            break;

        case 'Умеренный уровень активности':
            parameterValue = 1.55
            break
        
        case 'Тяжелая или трудоемкая активность':
            parameterValue = 1.7
            break
        case 'Экстремальный уровень':
            parameterValue = 1.9
            break

        default:
            break;
    }
    console.log(parameterValue);
    return parameterValue
}

</script>

<style>

</style>