import React from 'react'
import Menu from './Menu';
import logo from '../images/keyLogo.jpg';

// Display program name and logo
// Call Menu function inside div
function Header() {
  return (
    <header>
      <div className="gridHeader" >
        <div className="headerH3">
          <h2>Password Manager</h2>
        </div>
        <div>
          <img src={logo} className="headerLogo" alt="logo" /> 
        </div>
        <div >
          <Menu/>
        </div>    
      </div>
    </header>
        
  )
}

export default Header