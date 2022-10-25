import React,{useState} from 'react'
import {Link} from 'react-router-dom';


function Menu() {

   // Declare the states of each item on the menu
    const[showHome,setShowHome] = useState(false);
    const[showPasswordAdd, setShowpasswordAdd] = useState(true);
    const[showDisplayPasswords, setShowDisplayPasswords] = useState(true);
    const[showEditUserRights, setEditUserRights] = useState(true);

    // Declare different displays activated and deactivated with functions based on button clicked
    const homeShow = (
        <Link to="/"  ><button className="menuButton" onClick={()=>{setShowHome(false); setShowpasswordAdd(true); setShowDisplayPasswords(true);  setEditUserRights(true); }}>WELCOME LOGGED IN</button></Link>
     );
     
     const passwordAddShow = (
        <Link to="/addpassword" ><button className="menuButton" onClick={()=>{setShowHome(true); setShowpasswordAdd(false); setShowDisplayPasswords(true);  setEditUserRights(true); }}>ADD PASSWORD</button></Link>
     );
     
     const displayPasswordsShow = (
        <Link to="/displaypasswords"><button className="menuButton" onClick={()=>{setShowHome(true); setShowpasswordAdd(true); setShowDisplayPasswords(false);  setEditUserRights(true); }}>DISPLAY PASSWORDS</button></Link>
     );
 
     const editUserRightsShow = (
        <Link to="/edituserrights" ><button className="menuButton" onClick={()=>{setShowHome(true); setShowpasswordAdd(true); setShowDisplayPasswords(true);  setEditUserRights(false); }}>EDIT USER PERMISSION</button></Link>
     );

   // Return the buttons that is true and hide the page button that is clicked on
  return (
    <div className="gridHeaderLogoButtons">
       <nav>
        {showHome?homeShow:null} 
        {showPasswordAdd?passwordAddShow:null}
        {showDisplayPasswords?displayPasswordsShow:null}
        {showEditUserRights?editUserRightsShow:null}
        </nav>
    </div>
  )
}

export default Menu