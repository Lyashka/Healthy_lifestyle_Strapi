import { ref } from 'vue'

import { useCalendarDaysStore } from '@/stores/calendarDays' 
const calendarDaysStore = useCalendarDaysStore()
const { calendarDays, calculateMyCalories, updateCalendarDays } = calendarDaysStore

import { useSelectedDateForStatisticsDataStore } from '@/stores/selectedDateForStatisticsData'
const selectedDateForStatisticsDataStore = useSelectedDateForStatisticsDataStore()
const { selectedDates, getSelectedDates } = selectedDateForStatisticsDataStore

export default function getDataCalories() {
    const labels = buildArrayLabels() 
    const parametrs = buildArrayParametrs()
    return {
        labels: labels,
        parametrs: parametrs
    }

}

function buildArrayParametrs() {
    if(localStorage.getItem('calendarDays')){
      updateCalendarDays(JSON.parse(localStorage.getItem('calendarDays')))
    }

    let arrayParametrs = []
    const labelsValue = getSelectedDates()
   
    labelsValue.forEach(item => {
        let found = false;
        calendarDays.forEach(el => {
            if(item.toLocaleDateString() === el.date) {
                arrayParametrs.push(el.summCalories)
                found = true
                return
            }   
        })
        if (!found) {
            arrayParametrs.push(0);
          }
    })
    return arrayParametrs
}

function buildArrayLabels() {
    let arrayLabels = []
    getSelectedDates().forEach(el => {
        arrayLabels.push(el.toLocaleDateString())
    })
    // console.log(arrayLabels);
    return arrayLabels
}