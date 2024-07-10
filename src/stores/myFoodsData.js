import { ref, reactive } from 'vue'
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
        console.log(myFoods.value);
    }

    function removeMyFoods(foodId) {
        const index = myFoods.value.findIndex((item) => item.id === foodId)
        if (index !== -1) {
            myFoods.value.splice(index, 1)
        }
        localStorage.setItem('myFoods',  JSON.stringify(myFoods.value))
    }

    function getMyFoods() {
        // if(localStorage.getItem('myFoods')){
        //     myFoods.value = JSON.parse(localStorage.getItem('myFoods'))
        // }

        return myFoods.value
    }

    function updateMyFood(myFood){
        myFoods.value = []
        myFood.forEach(e => {
            myFoods.value.push(e)
        })
        console.log(myFoods.value);
    }

    function filterMyFoods(value) {
        return myFoods.value.filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase()) 
          )
    }

    function searchDuplicatesMyFood(value) {
        // console.log(value);
        // const lastUserName = users[users.length - 1].name.toLowerCase();
        for (let i = 0; i < myFoods.value.length; i++) {
        if (myFoods.value[i].name.toLowerCase() == value.toLowerCase()){
            console.log(myFoods.value[i].name);
            return true
        }else{
            return false
        }
    }    

    }

    function searchDublicateFoods() {

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