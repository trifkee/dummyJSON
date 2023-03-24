import axios from 'axios'

export function fetchComments(url) {
    return axios.get(`https://dummyjson.com/auth/posts/${url}/comments`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        }
    })    
}