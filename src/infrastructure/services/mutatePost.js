import axios from "axios"

export function mutatePost(url, body) {
    return axios.post(url, {...body}, {
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        }
    })
}