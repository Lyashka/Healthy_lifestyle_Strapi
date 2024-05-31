import { ref, reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useCalendarDaysStore = defineStore('calendarDays', () => {
  const calendarDays = reactive([
    {
      date: '30.05.2024', //Дата дня 
      breakfast: [
        { id: 1, name: 'Яйца', calories: 400 },
        { id: 2, name: 'Овсянка', calories: 300 },
      ],
      lunch: [
        { id: 3, name: 'Суп', calories: 400 },
        { id: 4, name: 'Салат', calories: 250 }
      ],
      dinner: [
        { id: 5, name: 'Стейк', calories: 600 },
        { id: 6, name: 'Рыба', calories: 350 },
      ], 
    },
    {
      date: '31.05.2024', //Дата дня 
      breakfast: [
        { id: 7, name: '111', calories: 200 },
        { id: 8, name: '222', calories: 300 }
      ],
      lunch: [
        { id: 9, name: '333', calories: 400 },
        { id: 10, name: '444', calories: 250 }
      ],
      dinner: [
        { id: 11, name: '555', calories: 600 },
        { id: 12, name: '666', calories: 350 },
      ], 
    }
  ])
  const targetDate = ref(new Date())

  const dataForDay = ref({})
  
  
  const addNewDayInCalendar = function(newData) {
    calendarDays.push({
      date: newData.date, //Дата дня 
      breakfast: newData.breakfast,
      lunch: newData.lunch,
      dinner: newData.dinner, 

    })
  } 

  function getTargetDate() {
    return targetDate.value.toLocaleDateString()
  }

  function editTargetDate(newDay) {
    targetDate.value = newDay
    // console.log(newDay);
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
    console.log(dataForDay.value);
    return dataForDay.value
  } 

  // function editDataForDay() {
  //   calendarDays.forEach(item => {
  //     if (item.date == targetDate.value.toLocaleDateString()) {
  //       dataForDay.value = item
  //     }else{
  //       dataForDay.value = {}
  //     }
  //   })
  // }
// watch(dataForDay, () => {
//  console.log('sss');
//  console.log(dataForDay);
// })

  return { 
    calendarDays,
    getTargetDate,
    editTargetDate,
    getDataForDay,
    // editDataForDay,
    dataForDay
  }
})

