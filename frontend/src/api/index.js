import axios from 'axios';


console.log("API Base URL being used:", import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default api;