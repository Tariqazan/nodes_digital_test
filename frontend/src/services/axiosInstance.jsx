import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
    'Content-Type': 'application/json',
});

export default axiosInstance;
