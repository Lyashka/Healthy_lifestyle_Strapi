import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePersonalizationDataStore = defineStore('personalizationData', () => {
    const personalization = ref({}) 

    function updatePersonalization(newPerson) {
        personalization.value = newPerson
        console.log(personalization.value);
        localStorage.setItem('personalization', JSON.stringify(personalization.value))
    }
    function getPersonalization(){
        return personalization.value
    }
    return {
        updatePersonalization,
        getPersonalization
    }
})