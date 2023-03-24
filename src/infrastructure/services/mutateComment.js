import axios from "axios"

export function mutateComment(url, body) {
    return axios.post(url, {...body}, {
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        }
    })
}