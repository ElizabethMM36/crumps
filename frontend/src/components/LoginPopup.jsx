import React from 'react'
import './LoginPopup.css'

const LoginPopup = ({setShowLogin}) => {
    const [currState, setCurrState] = useState("Sign Up")
  return (
    <div className='login-popup'>
    <form className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs"></div>

    </form>
      
    </div>
  )
}

export default LoginPopup
