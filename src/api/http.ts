import axios from 'axios';
import { GLOBAL_VAR } from './constants';

const httpServ = axios.create({
    baseURL : GLOBAL_VAR.BASE_URL,
})

export default httpServ;
