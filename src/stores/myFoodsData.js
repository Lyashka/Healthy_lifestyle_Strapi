import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMyFoodsDataStore = defineStore('myFoodsData', () => {
    const myFoods = ref([]) 

    function addMyFoods(newFood) {

            myFoods.value.unshift(newFood)

            myFoods.value = myFoods.value.map((food, index) => ({
            ...food,
            id: index + 1, 
            canDelete: true
            }))

      
        
        localStorage.setItem('myFoods',  JSON.stringify(myFoods.value))
    }

    function removeMyFoods(foodId) {
        const index = myFoods.value.findIndex((item) => item.id === foodId)
        if (index !== -1) {
            myFoods.value.splice(index, 1)
        }
        localStorage.setItem('myFoods',  JSON.stringify(myFoods.value))
    }

    function getMyFoods() {
        return myFoods.value
    }

    function updateMyFood(myFood){
        myFoods.value = []
        myFood.forEach(e => {
            myFoods.value.push(e)
        })
    }

    function filterMyFoods(value) {
        return myFoods.value.filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase()) 
          )
    }

    function searchDuplicatesMyFood(value) {
        if (myFoods.value.some(item => item.name == value)){
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
        updateMyFood
    }
})