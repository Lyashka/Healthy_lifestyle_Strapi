import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHistoryDataStore = defineStore('historyData', () => {
  const historyData = ref([])

  function addProductInHostory(products) {
    products.forEach(el => {
      const isDuplicate = historyData.value.some(item => item.name === el.name); 
      if (!isDuplicate){
        historyData.value.unshift(el)
      }else{
        const foundFood = historyData.value.find(food => food.name === el.name)
        if(foundFood){
        foundFood.calories = el.calories
        foundFood.proteins = el.proteins
        foundFood.fats = el.fats
        foundFood.carbs = el.carbs
        foundFood.productWeight = el.productWeight

        historyData.value.unshift(foundFood)
        historyData.value = deleteDublicateInArr(historyData.value)
        }
      }
    })     
    localStorage.setItem('historyData', JSON.stringify(historyData.value))
  }

  function getHistoryData() {
    if (localStorage.getItem('historyData')){
      historyData.value = JSON.parse(localStorage.getItem('historyData'))
    }
    return historyData.value
  }

  function deleteDublicateInArr(arr) {
    return arr.filter((item, index, self) => 
      index === self.findIndex(t =>  t.name === item.name)
    )
  }
 
  return {
    historyData,
    addProductInHostory,
    getHistoryData
  }
})