
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
  
  const labelsValue = getSelectedDates()

  const arrayParametrs = labelsValue.map(item => {
    const foundLabel = calendarDays.find(el => item.toLocaleDateString() == el.date)
    return foundLabel ? foundLabel.summCalories : 0
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