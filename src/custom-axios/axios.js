import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend-library-app.herokuapp.com/api',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;