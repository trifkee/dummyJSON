import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export const useLogout = (data) => {
    
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    if(data){
        alert(message)
    }

    useEffect(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        navigate('/login')
    }, [])
}