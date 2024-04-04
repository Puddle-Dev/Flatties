import axios from 'axios';
import CookieManager from './cookies/cookieManager';
import config from '../config';

const cookieManager = CookieManager();
cookieManager.setCookie(" ", " "); 

const baseURL = config.baseURL;
const apiVersion = config.apiVersion;
const token = cookieManager.getCookie('token');

// Create an axios instance
const instance = axios.create({
    baseURL: `${baseURL}${apiVersion}`,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

export default instance;