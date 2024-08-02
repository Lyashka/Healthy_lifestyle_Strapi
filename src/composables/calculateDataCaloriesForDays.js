
import { useCalendarDaysStore } from '@/stores/calendarDays' 
import { useSelectedDateForStatisticsDataStore } from '@/stores/selectedDateForStatisticsData'

const { calendarDays, updateCalendarDays } = useCalendarDaysStore()
const { getSelectedDates } = useSelectedDateForStatisticsDataStore()

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

    const arrayParametrs = []
    const labelsValue = getSelectedDates()

    labelsValue.forEach(item => {
        let found = false;
        const foundLabel = calendarDays.find(el => item.toLocaleDateString() == el.date)
        if (foundLabel) {
            arrayParametrs.push(foundLabel.summCalories)
            found = true      
        }
        if (!found) {
            arrayParametrs.push(0);
          }
    })
    return arrayParametrs
}

function buildArrayLabels() {
    const arrayLabels = []
    getSelectedDates().forEach(el => {
        arrayLabels.push(el.toLocaleDateString())
    }) 
    return arrayLabels
}