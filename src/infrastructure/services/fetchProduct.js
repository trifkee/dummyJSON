import axios from 'axios'

export function fetchProduct(url) {
    return axios.get(`https://dummyjson.com/auth/products/${url}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        }
    })    
}