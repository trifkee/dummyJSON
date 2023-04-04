import { useState, useEffect } from 'react'

function useAuth() {
    const [logged, setLogged] = useState(false)
    const user = localStorage.getItem('user')

    let token = localStorage.getItem('token')

    useEffect(() => {

        if(token && user) setLogged(true)

    }, [token, user])

    return {logged, setLogged}
}

export default useAuth