import { useEffect, useState } from "react"
import { redirect } from "react-router"

export const useLogout = (data) => {
    
    const [message, setMessage] = useState('')

    if(data){
        alert(message)
    }

    useEffect(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        return redirect('/login')
    }, [])
}