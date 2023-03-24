import axios from 'axios'

export function fetchPost(url) {
    return axios.get(`https://dummyjson.com/auth/posts/${url}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        }
    })    
}