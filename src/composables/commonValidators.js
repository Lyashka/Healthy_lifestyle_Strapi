import { useMyFoodsDataStore } from '@/stores/myFoodsData' 
const myFoodsDataStore = useMyFoodsDataStore() 
const { myFoods, addMyFoods, getMyFoods, searchDuplicatesMyFood } = myFoodsDataStore


const commonRules = {
  checkStringName: (value) => {
    // if(value){
      if (!value ) {
        return  'Обязательное поле' 
      }
      if (searchDuplicatesMyFood(value)){
        return 'Этот продукт уже существует'
      }
    // }
  },
  checkNumber: (value) => {
    if(value == ''){
      return  'Обязательное поле' 
    }
    if (value >= 0) {
      return true;
    }else{
      return 'Число не должно быть меньше 0';
    }
    

  }
}

  export default commonRules