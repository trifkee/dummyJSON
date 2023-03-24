import axios from 'axios'

export function fetchData(url) {
    return axios.get(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        }
    })    
}