import axios from 'axios'

export function fetchUser(url) {
    return axios.get(`https://dummyjson.com/auth/users/${url}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        }
    })    
}