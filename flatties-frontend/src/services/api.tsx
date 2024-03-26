import axios, {AxiosRequestConfig } from 'axios';
import CookieManager from './cookies/cookieManager';
import config from '../config';


// Create an axios instance
const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default instance;


