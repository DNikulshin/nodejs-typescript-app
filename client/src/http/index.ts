import axios from "axios";

console.log(import.meta.env.VITE_APP_API_URL,'1111111111111111')

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})


export default $api