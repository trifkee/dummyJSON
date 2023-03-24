import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import AppContext from '../../infrastructure/store/context'
import useAuth from '../../infrastructure/hooks/useAuth'

function Login() {
    const navigate = useNavigate()

    const { setActiveUser } = useContext(AppContext)

    const [user, setUser] = useState(
        {
            username:'',
            password:''
        }
    )

    const [logged, setLogged] = useAuth()

    useEffect(() => {
        if(logged) {
           return navigate('/')
        }
    }, [logged])

    // POST LOGIN METHOD
    const fetchUser = () => {
        return fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: user.username,
              password: user.password,
            })
          })
          .then(res => res.json())
    }

    const handleOnSuccess = data => {
        if(data?.token){
            setLogged(true)
            setActiveUser(data)
            localStorage.setItem('user', data.id)
            localStorage.setItem('token', data.token)
            navigate('/')
        }
    }

    const { mutate:handleSubmit } = useMutation({
        mutationFn: fetchUser,
        onSuccess: data => handleOnSuccess(data),
        onError: err => console.log(err)
    })

    const handleChange = (e) => {
        setUser(prevUser => {
            return {
                ...prevUser,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className='login-page'>
            <div className='login-form'>
            <h1>Welcome!</h1>
                <div className="login-input username">
                    <label htmlFor="username"><ion-icon name="person-outline"></ion-icon>&nbsp; Username</label>
                    <input onChange={handleChange} name='username' value={user.username} type="text" placeholder='username' />
                </div>
                <div className="login-input password">
                    <label htmlFor="password"><ion-icon name="key-outline"></ion-icon>&nbsp; Password</label>
                    <input onChange={handleChange} name='password' value={user.password} type="password" placeholder='********' />
                </div>
                <button onClick={handleSubmit} >Log in</button>
            </div>
        </div>
    )
}

export default Login