import axios from 'axios';
import { AsyncStorage } from "react-native";

const axInstance = axios.create({
    baseURL: 'http://09375eaa.ngrok.io'
});

axInstance.interceptors.request.use(
    async (config) => { 
        const token = await AsyncStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
    ,
    (err) => {
        return Promise.reject(err);
    }
)
export default axInstance;