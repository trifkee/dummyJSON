import axios from "axios"

export function mutateUser(url, body) {
    return axios.post(url, {...body}, {
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        }
    })
}