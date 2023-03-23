import { useState, useEffect } from 'react'

function useAuth() {
    const [logged, setLogged] = useState(null)

    let token = localStorage.getItem('token')

    useEffect(() => {

        if(token) setLogged(true)

    }, [])

    return [logged, setLogged]
}

export default useAuth