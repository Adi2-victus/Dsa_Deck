import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'process.env.BacKend_URL',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

