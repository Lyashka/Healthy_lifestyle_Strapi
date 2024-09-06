import { ref } from 'vue'
import { defineStore } from 'pinia'

import requestGetUserProduct from '../api/requestGetUserProducts.js'
import requestPostAddUserProduct  from '../api/requestPostAddUserProduct.js'
import requestDeleteUserProduct from '../api/requestDeleteUserProduct.js'

export const useMyFoodsDataStore = defineStore('myFoodsData', () => {
  const myFoods = ref([])

  const alertStatus = ref({})
  function getAlertStatus(){
    return alertStatus.value
  }

  async function addMyFoods(newFood) {

    const res = await requestPostAddUserProduct(newFood)
    if (res.status === 200) {
      myFoods.value.unshift(newFood)
    }
    alertStatus.value = res
  }

  async function removeMyFoods(foodId) {
    const res = await requestDeleteUserProduct(foodId)
    await getMyFoods()
    alertStatus.value = res
    return res
  }

  async function getMyFoods() {
    const myFoodsResponse = await requestGetUserProduct()
    if(myFoodsResponse.status === 200) {
      myFoods.value = myFoodsResponse.data.data
        .map((food) => ({
          ...food,
          canDelete: true
        }))
    }else{
      myFoods.value = []
      alertStatus.value = myFoodsResponse
    }

    return myFoods.value
  }

  function filterMyFoods(value) {
    return myFoods.value.filter(item => 
      item.name.toLowerCase().includes(value.toLowerCase()) 
    )
  }

  function searchDuplicatesMyFood(value) {
    if (myFoods.value.some(item => item.name === value)){
      return true
    }else{
      return false
    }
  }

  return { 
    myFoods,
    addMyFoods,
    removeMyFoods,
    getMyFoods,
    searchDuplicatesMyFood,
    filterMyFoods,
    getAlertStatus
  }
})