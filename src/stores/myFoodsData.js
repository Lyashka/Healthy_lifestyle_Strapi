import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMyFoodsDataStore = defineStore('myFoodsData', () => {
    const myFoods = ref([]) 

    function addMyFoods(newFood) {
        myFoods.value.push(newFood)
        localStorage.setItem('myFoods',  JSON.stringify(myFoods.value))
    }

    function removeMyFoods() {

    }

    function getMyFoods() {
        if(localStorage.getItem('myFoods')){
            myFoods.value = JSON.parse(localStorage.getItem('myFoods'))
        }

        return myFoods.value
    }

    function filterMyFoods(value) {
        return myFoods.value.filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase()) 
          )
    }

    function searchDuplicatesMyFood(value) {
        console.log(value);
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
        filterMyFoods
    }
})