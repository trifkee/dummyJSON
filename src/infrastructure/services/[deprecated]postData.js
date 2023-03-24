import axios from "axios"

export function postData(url, body) {
    return axios.post(url, {...body}, {
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        }
    })
}