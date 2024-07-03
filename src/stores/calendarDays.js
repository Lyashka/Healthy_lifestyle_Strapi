import { ref, reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { last } from 'lodash'

export const useCalendarDaysStore = defineStore('calendarDays', () => {
  const calendarDays = reactive([])
  const targetDate = ref(new Date())

  const dataForDay = ref({})

  const addNewDataInCalendar = function(newData) { 

    const isExistDay = calendarDays.some(item => {
      return item.date.includes(newData.date)
    })
    if (isExistDay){
      addFoodsInRation(newData)
    }else{
      calendarDays.push({
        date: newData.date,
        breakfast: [],
        lunch: [],
        dinner: []
      })
      addFoodsInRation(newData)
    }
  } 

  function addFoodsInRation(newData) {
    calendarDays.forEach(item => {
      if (item.date == newData.date) {
        if(newData.ration.id == 1) {
          newData.selectedFoods.forEach(newFood => {
            console.log(item.breakfast.length);
            item.breakfast.push(
              {
                id: item.breakfast.length != 0  ? item.breakfast[item.breakfast.length-1].id + 1 : 1,
                ...newFood
              }
            )
          })
        }
        else if (newData.ration.id == 2){
          newData.selectedFoods.forEach(newFood => {
            item.lunch.push(
              {
                id: item.lunch.length != 0 ? item.lunch[item.lunch.length-1].id + 1 : 1,
                ...newFood
              }
            )
          })
        }else if (newData.ration.id == 3){
          newData.selectedFoods.forEach(newFood => {
            item.dinner.push(
              {
                id: item.dinner.length != 0 ? item.dinner[item.dinner.length-1].id + 1 : 1,
                ...newFood
              }
            )
          })
        }
      }
      console.log(item);
    })
  }

  function removePositionFromRation(date, rationId, positionId) {
    calendarDays.forEach(e => {
      if(e.date == date){
        if(rationId == 1){
          const index = e.breakfast.findIndex(item => item.id == positionId)
          if (index != -1) {
            e.breakfast.splice(index, 1)
          }
        }else if(rationId == 2) { 
          const index = e.lunch.findIndex(item => item.id == positionId)
          if (index != -1) {
            e.lunch.splice(index, 1)
          }
        }else if(rationId == 3) {
          const index = e.dinner.findIndex(item => item.id == positionId)
          if (index != -1) {
            e.dinner.splice(index, 1)
          }
        }
      }
    })
  }

  function getTargetDate() {
    return targetDate.value.toLocaleDateString()
  }

  function editTargetDate(newDay) {
    targetDate.value = newDay
    getDataForDay()
  }
 
  function getDataForDay() {
    let isEmptyData = true
    calendarDays.forEach(item => {
      if (item.date == targetDate.value.toLocaleDateString()) {
        dataForDay.value = item
        isEmptyData = false
      }
    })
    if(isEmptyData) {
      dataForDay.value = {}
    }
    return dataForDay.value
  } 

function calculateMyCalories() {
  const dataForDay = getDataForDay()
  let resultCalories = 0
  if(dataForDay) {
    if(dataForDay.breakfast) {
      dataForDay.breakfast.forEach(e => {
        resultCalories += trimString(e.calories)
      })
    }
    if(dataForDay.lunch){
      dataForDay.lunch.forEach(e => {
        resultCalories += trimString(e.calories)
      })
    }
    if(dataForDay.dinner){
      dataForDay.dinner.forEach(e => {
        resultCalories += trimString(e.calories)
      })
    }
    addSummCaloriesInDay(dataForDay, resultCalories)
    return resultCalories
  }else{
    addSummCaloriesInDay(dataForDay, resultCalories)
    return resultCalories
  }
}

function addSummCaloriesInDay(dataForDay, resultCalories) {
  calendarDays.forEach(el => {
    if(el.date == dataForDay.date) {
      el.summCalories = resultCalories
    }
  })
}

function trimString(value) {
  const cleanedStr = value.replace(',', '.').replace(/\s/g, '') 
  return parseFloat(cleanedStr)
}

function updateCalendarDays(newCalendarDays) {

 
  newCalendarDays.forEach(e => {
    if(!calendarDays.some(item => item.date == e.date)) {
      calendarDays.push(e)
    }
    
   })
 
//  console.log(newCalendarDays);
//  console.log(calendarDays);
}

watch(calendarDays, () => {
  localStorage.setItem('calendarDays', JSON.stringify(calendarDays))
})

  return { 
    calendarDays,
    dataForDay,
    addNewDataInCalendar,
    getTargetDate,
    editTargetDate,
    getDataForDay,
    removePositionFromRation,
    calculateMyCalories,
    updateCalendarDays
  }
})

