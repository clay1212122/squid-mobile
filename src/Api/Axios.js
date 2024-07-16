import axios from 'axios';

export const axiosCliente = axios.create({
    baseURL: 'http://192.168.100.16:3010/',
    timeout: 50000,
});