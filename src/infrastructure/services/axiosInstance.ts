import axios from "axios";

const instance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type' : 'application/json'
    }
})

instance.interceptors.response.use( 
    res => res,
    err => {
        if(err.respons.status === 401) {
            const win: Window = window
            win.location = '/login'
        }
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        throw new Error('Greska!')
})

export default instance