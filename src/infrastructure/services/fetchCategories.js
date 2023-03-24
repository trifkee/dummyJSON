import axios from 'axios'

export function fetchCategories() {
    return axios.get(`https://dummyjson.com/auth/products/categories`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        }
    })    
}