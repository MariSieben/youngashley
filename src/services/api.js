import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.166.1.6:3333'
});

export default api;