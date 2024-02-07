import axios, {AxiosRequestConfig } from 'axios';

// Create an axios instance
const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default instance;


