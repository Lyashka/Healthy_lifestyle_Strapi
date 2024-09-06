
import axios from 'axios';
export default function getAllProducts() {
 return axios.get('http://localhost:1337/api/products')
   .catch((error) => {
    console.error('Ошибка при получении данных:', error);
    return error

   })
}
