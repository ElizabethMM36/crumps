import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../assets/assets'

const Navbar = () => {

    const [menu, setMenu] = useState("home")
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="logo" className='logo' />
        <ul className="navbar-menu">
            <li onClick={()=>setMenu("home")} className={menu ==="home"?"active":""}>Home</li>
             <li onClick={()=>setMenu("menu")}className={menu ==="menu"?"active":""}  >menu</li>
              <li onClick={()=>setMenu("mobile-app")}className={menu ==="mobile-app"?"active":""}  >mobile-app</li>
               <li onClick={()=>setMenu("contact us")} className={menu ==="contact us"?"active":""}>contact us</li>
        </ul>
        
        <div className="navbar-right">
  <img src={assets.search_icon} alt="search" className="nav-icon" />

  <div className="navbar-search-icon">
    <img src={assets.basket_icon} alt="basket" className="nav-icon" />
    <div className="dot"></div> {/* just the red circle */}
  </div>

  <button>Sign In</button>
  <button>Admin</button>
</div>

                </div>
           
  )
}

export default Navbar
