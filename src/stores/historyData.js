import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useHistoryDataStore = defineStore('historyData', () => {
    const historyData = reactive([])

    function addProductInHostory(products) {
        
        products.forEach(el => {
            console.log(el);
            const isDuplicate = historyData.some(item => item.name == el.name && item.productWeight == el.productWeight); 
            if (!isDuplicate){
                historyData.push(el)
            }
            
        });
        console.log(historyData);
    }
 
    return {
        historyData,
        addProductInHostory
    }
})