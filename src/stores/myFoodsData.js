import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMyFoodsDataStore = defineStore('myFoodsData', () => {
    const myFoods = ref([]) 

    function addMyFoods() {

    }

    function removeMyFoods() {

    }

    return { 
        myFoods,
        addMyFoods,
        removeMyFoods
    }
})