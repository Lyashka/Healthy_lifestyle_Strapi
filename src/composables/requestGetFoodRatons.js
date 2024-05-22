import axios from "axios";
export default async function getFoodRations() {
    try {
        const response = await axios.get('/food_rations.json')
        return response.data 
    } 
    catch (error) {
        console.error(error);
    }
}