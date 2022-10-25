import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import { api } from '../Api';
import PasswordsDisplayEditPage from './PasswordsDisplayEditPage';

function PasswordsDisplay() {
  // Get the token from Session storage
  let token = sessionStorage.getItem("token");

  // Declare state
  const[started, setStarted]= useState(false);
  const[error,setError] = useState(null);
  const[isLoaded,setIsLoaded] = useState(false);

  //User information:
  const[userData,setUserData] = useState([]);

  // Validate the token that the user have right to view page
  // Get the user Data from the API
  function componentDidMountLoginValidation(token) {
    let method = "GET";
    let data = null;
      
    // Fetch data from API and update
    api(`verifypasswordspage/`, method ,data, token )
    .then(result => {
      setUserData(result);
      setStarted(true);
      setIsLoaded(true);
    },
    (error) => {
        setError(error);
        setStarted(true);
        setIsLoaded(true);
    })
  }

  // If user token does not pass the JWT test, don't have access to edit data
  if(token === null || token === "failed"){
    return(
    <div>
      <h2>Login is required to view this page, visit home page</h2>
      <Link to="/" ><button >HOME</button></Link>
    </div>
    )
  }
  else if(started === false){
    componentDidMountLoginValidation(token)
  } 
  else if (!isLoaded) { 
    return <div>Loading...</div>;
  }
  else if(error){
    return(
      <div>
        <h2>Login is required to view this page, visit home page</h2>
        <Link to="/" ><button >HOME</button></Link>
    </div>
    )
  }
  else {
    return(
      <div>
        <h2>CLICK TO DISPLAY</h2>
        {userData.ouDivision.map((element, index) =>{
          return(
              <div key={index}>
                <hr/>
                <PasswordsDisplayEditPage ouDivision={element} userData={userData} />
              </div>
             )
        })}
        <br/><br/>
      </div>
    )
  }
}

export default PasswordsDisplay