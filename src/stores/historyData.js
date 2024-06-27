import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useHistoryDataStore = defineStore('historyData', () => {
    const historyData = ref([])

    function addProductInHostory(products) {
        
        products.forEach(el => {
            const isDuplicate = historyData.value.some(item => item.id == el.id && item.name == el.name); 
            if (!isDuplicate){
                historyData.value.unshift(el)
            }else{ 
                historyData.value.forEach(newValue => {
                    if(newValue.id == el.id){
                        newValue.calories = el.calories
                        newValue.proteins = el.proteins
                        newValue.fats = el.fats
                        newValue.carbs = el.carbs
                        newValue.productWeight = el.productWeight

                        historyData.value.unshift(newValue)
                        historyData.value = deleteDublicateInArr(historyData.value)
                    }
                })
                
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
        index === self.findIndex(t => t.id === item.id && t.name === item.name)
        )
    }
    return {
        historyData,
        addProductInHostory,
        getHistoryData
    }
})