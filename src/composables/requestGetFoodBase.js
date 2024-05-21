import axios from "axios";
export default async function getFoodBase() {
    try {
        const response = await axios.get('/food_base.json')
        return response.data
    } 
    catch (error) {
        console.error(error);
    }
}