import axios from 'axios';
import { parseCookies } from 'nookies';


const { 'token': token } = parseCookies();

export const api = axios.create({
    baseURL: 'http://localhost:3333'
})

api.interceptors.request.use(config =>{
    console.log(config);
    return config
})

if(token){
    api.defaults.headers['authorization']= `bearer ${token}`
}