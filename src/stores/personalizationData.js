import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePersonalizationDataStore = defineStore('personalizationData', () => {
    const personalization = ref({}) 
    const statusMenuPersonalization = ref(false)

    function setStatusMenuPersonalization(value) {
        statusMenuPersonalization.value = value
    }

    function getStatusMenuPersonalization(){
        return statusMenuPersonalization.value
    }

    function updatePersonalization(newPerson) {
        personalization.value = newPerson
        localStorage.setItem('personalization', JSON.stringify(personalization.value))
    }

    function getPersonalization(){
        return personalization.value
    }

    return {
        setStatusMenuPersonalization,
        getStatusMenuPersonalization,
        updatePersonalization,
        getPersonalization
    }
})