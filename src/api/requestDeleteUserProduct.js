import axios from 'axios'
export default function deleteUserProduct(productId) {
  return axios.delete(`http://localhost:1337/api/user-products/${productId}`)
    .then(response => {return response})
    .catch(error => {return error.response})
}