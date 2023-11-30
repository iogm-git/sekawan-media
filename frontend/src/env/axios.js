import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true
})

export function configJwt(token) {
    return { headers: { Authorization: `Bearer ${token}` } }
}

