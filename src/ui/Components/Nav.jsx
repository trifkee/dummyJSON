import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useFetchUser } from '../../infrastructure/API/queries/useFetchUser'

function Nav() {
  let navigate = useNavigate()
  let currUser = localStorage.getItem('user')

  const [active, isActive] = useState(false)

  // FETCH USER
  const { data:user } = useFetchUser('user', `${currUser}`)

  // TOGGLE NAV ON MOBILE
  const handleClick = () => {
    isActive(prevActive => !prevActive)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  // IF USER IS LOGGED IN
  if(currUser){
    return (
      <nav>
          <div className="nav-main" style={{display:'flex', alignItems:'center'}}>
            <Link to="/">
              <h1>DummyJSON</h1>
            </Link>
            <div style={{cursor:'pointer'}} onClick={handleClick} className="icon"><ion-icon style={{fontSize:'2rem'}} name="menu"></ion-icon></div>
          </div>
          <ul className={active ? 'active' : null}>
              <Link to="/" style={{display:'flex', alignItems:'center', gap:'1rem'}}><ion-icon name="list"></ion-icon> Products</Link>
              <Link to="/posts" style={{display:'flex', alignItems:'center', gap:'1rem'}}><ion-icon name="chatbubbles"></ion-icon> Posts</Link>
              <Link className='nav-user' to={`/profile/${currUser}`} style={{display:'flex', alignItems:'center', gap:'1rem'}}><ion-icon name="person"></ion-icon> {user?.data.username || 'Profile'}
                <div className="nav-additional">
                  <p style={{display:'flex', gap:'.5rem', alignItems:'center', marginBottom:'.5rem'}}>Sign out <ion-icon name="log-out-outline"></ion-icon></p>
                  <button onClick={handleLogOut}>sign out</button>
                </div>
              </Link>
          </ul>
      </nav>
    )
  }
}

export default Nav