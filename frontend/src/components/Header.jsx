import React from 'react'
import './Header.css'
import header_img from '../assets/header_img.png';

const Header = () => {
  return (
    <div className= "header" style={{ backgroundImage: `url(${header_img})` }}>
        <div className="header-contents">
            <h2>Delicious </h2>
            <p>Near you.</p>
            
        </div>
      
    </div>
  )
}

export default Header
