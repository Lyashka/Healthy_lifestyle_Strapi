import axios from 'axios'
export default function addUserProduct(userProduct) {
  return  axios.post('http://localhost:1337/api/user-products', {
      "data": userProduct
   }).then(response => {return response})
    .catch(error => {return error.response})
}