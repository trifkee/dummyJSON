import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  const [active, isActive] = useState(false)

  const handleClick = () => {
    isActive(prevActive => !prevActive)
  }

  return (
    <nav>
        <div className="nav-main" style={{display:'flex', alignItems:'center'}}>
          <Link to="/">
            <h1>DummyJSON</h1>
          </Link>
          <div style={{cursor:'pointer'}} onClick={handleClick} className="icon"><ion-icon style={{fontSize:'2rem'}} name="apps"></ion-icon></div>
        </div>
        <ul className={active ? 'active' : null}>
            <Link to="/">Products</Link>
            <a href="#">Link</a>
        </ul>
    </nav>
  )
}

export default Nav