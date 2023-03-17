import React, { useState } from 'react'
import { useMutation } from 'react-query'
// import axios from 'axios'
// import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router'

function Login() {
    const navigate = useNavigate()

    const [user, setUser] = useState(
        {
            username:'',
            password:''
        }
    )

    const fetchUser = (e) => {
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

    const onSuccess = (data) => {
        console.log(data)
        if(data?.token){
            localStorage.setItem('token', data.token)
            navigate('/')
        }
    }

    // const { data, isFetching, isFetched } = useQuery('user', () => handleSubmit)
    const { mutate:handleSubmit } = useMutation({
        mutationFn: fetchUser,
        onSuccess: data => onSuccess(data),
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