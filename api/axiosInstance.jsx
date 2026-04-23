import axios from "axios"

const SERVER_URL = "https://task-management-backend-1-oqkd.onrender.com"


const axiosInstance = axios.create({
    baseURL:SERVER_URL
})

// for token send 

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('b69')
    console.log(token)
    if(token){
    const t = "Bearer "+token
        config.headers.Authorization = t
    }
    return config
})

export default axiosInstance