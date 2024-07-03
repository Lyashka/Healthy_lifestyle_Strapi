import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSelectedDateForStatisticsDataStore = defineStore('selectedDateForStatisticsData', () => {
    const selectedDates = ref([]) 

    function updateSelectedDates(newDates) {
        newDates.forEach(el => {
            selectedDates.value.push(el)
        })
        
        
    }
    function getSelectedDates(){
        if (selectedDates.value.length > 0) {
            console.log(selectedDates.value);
            return selectedDates.value
            
        }else{
            selectedDates.value.push(new Date())
            console.log(selectedDates.value);
            return selectedDates.value
        }
        
        
    }
    return { 
        selectedDates,
        updateSelectedDates,
        getSelectedDates
    }
}) 