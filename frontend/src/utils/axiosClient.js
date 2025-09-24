import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'BacKend_URL',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

