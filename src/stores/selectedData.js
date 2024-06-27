import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSelectedDataStore = defineStore('selectedData', () => {

    const selectedData = ref([])

    const selectedMain = ref([])
    const selectedHistory = ref([])
    const selectedMy = ref([])
    const countSelectedData = ref(0)

    function addSelectedData(selected, seletedId) {
            // selectedData.value = selected
            if(selected){
                if(seletedId == 1) {
                    selectedMain.value = selected
                    console.log(selectedMain.value);
                    //     selected.forEach(el => {
                    //         const isDuplicate = selectedData.value.some(item => item.name == el.name && item.productWeight == el.productWeight); 
                    //         if(!isDuplicate) { 
                    //             selectedData.value.push(el)
                    //         }
                    //     })
                    }
                else if(seletedId == 2) {
                    selectedHistory.value = selected
                    console.log(selectedHistory.value);
                }
                else if(seletedId == 3) {
                    selectedMy.value = selected
                }
            }
           
            selectedData.value = [...selectedMain.value, ...selectedHistory.value, ...selectedMy.value] 
            selectedData.value = selectedData.value.filter((item, index, self) => 
            index === self.findIndex(t => t.id === item.id && t.name === item.name && t.productWeight === item.productWeight)
            )
            console.log(selectedData.value);
    } 


    function getSelectedData(){
        // selectedData.value = [...selectedMain.value, ...selectedHistory.value, ...selectedMy.value]
        return selectedData.value
    }

    function clearSelectedData() {
        selectedMain.value = []
        selectedHistory.value = []
        selectedMy.value = []
        selectedData.value = []
    } 

    function getLengthSelectedData() {
        countSelectedData.value = selectedData.value.length
        return countSelectedData.value
    }

    function clearLengthSelectedData() {
        return countSelectedData.value = 0
    }
 
    return {
        addSelectedData,
        getSelectedData,
        clearSelectedData,
        getLengthSelectedData,
        clearLengthSelectedData
    }
})