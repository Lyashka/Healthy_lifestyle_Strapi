import { useMyFoodsDataStore } from '@/stores/myFoodsData' 

const { searchDuplicatesMyFood } = useMyFoodsDataStore() 

const commonRules = {
  checkStringName: (value) => {
      if (!value) {
        return  'Обязательное поле' 
      }else if (searchDuplicatesMyFood(value)){
        return 'Этот продукт уже существует'
      }else{
        return true
      }
  },
  checkNumber: (value) => {
    if(!value){
      return  'Обязательное поле' 
    }
    else if (value <= 0) {
      return 'Число не должно быть меньше 0';
    }else{
      return true
    }
  }
}

export default commonRules