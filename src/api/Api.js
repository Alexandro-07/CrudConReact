import axios from "axios";
import {
    URL_BASE
} from "../constants";
export const Api = axios.create({
    baseURL: `${URL_BASE}/api/`,
    timeout: 160000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
});