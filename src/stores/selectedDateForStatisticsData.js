import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSelectedDateForStatisticsDataStore = defineStore('selectedDateForStatisticsData', () => {
    const selectedDates = ref([]) 

    function updateSelectedDates(newDates) {
        selectedDates.value = []
        newDates.forEach(el => {
            selectedDates.value.push(el)
        })    
    }

    function getSelectedDates(){
        if (selectedDates.value.length > 0) {
            return selectedDates.value
        }else{
            selectedDates.value.push(new Date())
            return selectedDates.value
        }
    }
    
    return { 
        selectedDates,
        updateSelectedDates,
        getSelectedDates
    }
}) 