import axios from 'axios'

export function fetchProducts(url) {
    return axios.get(`https://dummyjson.com/auth/${url}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        }
    })    
}