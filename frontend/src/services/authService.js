import axios from "axios";

export const getLoginStatus = async () => {
    try {
        const response = await axios.get('/api/v1/users/loggedStatus')
        return response
    } catch (error) {
        console.log(error);
    }
}