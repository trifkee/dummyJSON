import { useState, useEffect } from 'react'

function useAuth() {
    const [logged, setLogged] = useState(false)

    let token = localStorage.getItem('token')

    useEffect(() => {

        if(token) setLogged(true)

    }, [token])

    return {logged, setLogged}
}

export default useAuth