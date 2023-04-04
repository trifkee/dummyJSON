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
        if(err.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            const win: Window = window
            win.location = '/login'
        }

        throw new Error('Error have occured:', err)
    }
   )

export default instance
