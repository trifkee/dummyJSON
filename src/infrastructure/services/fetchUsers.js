import axios from 'axios'

export function fetchUsers() {
    return axios.get(`https://dummyjson.com/auth/users`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        }
    })    
}