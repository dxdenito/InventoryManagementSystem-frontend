import axios from 'axios'

const api = axios.create({
    baseURL:"https://inventoryms.up.railway.app"
});
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    console.log("TOKEN BEING SENT:", token);
    if(token){
        config.headers.Authorization =`Bearer ${token}`
    }
    return config;
});

export default api;