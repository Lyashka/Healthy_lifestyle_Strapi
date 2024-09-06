import axios from 'axios';
export default function getUserProducts() {
  return  axios.get("http://localhost:1337/api/user-products")
    .catch((error) => {
      console.error('Ошибка при получении данных:', error);
      return error
    })
}
