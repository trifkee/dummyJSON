import axios from 'axios'

export function fetchUserPosts(url) {
    return axios.get(`https://dummyjson.com/auth/posts/user/${url}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        }
    })    
}