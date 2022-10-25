import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import { api } from '../Api';

// Add JOBS to the System
function AddPassword() {
  // Get the token from Session storage
  let token = sessionStorage.getItem("token");

  // Declare state
  const[started, setStarted]= useState(false);
  const[error,setError] = useState(null);
  const[errorPassword,setErrorPassword] = useState(null);
  const[addPassword, setAddPassword]= useState(false);
  const[isLoaded,setIsLoaded] = useState(false);
  const[newPasswordAdded,setNewPasswordAdded] = useState([]);

  //User information:
  const[userData,setUserData] = useState([]);

  // Store values before adding to databases 
  const[title,setTitle] = useState("");
  const[website,setWebsite] = useState("");
  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[ouDivisionForPassword,setOuDivisionForPassword] = useState("");

  // Validate the token that the user have right to view page
  // Get the user Data from the API
  function componentDidMountLoginValidation(token) {
    let method = "GET";
    let data = null;
        
    // Fetch data from API and update
    api(`verifypasswordspage/`, method ,data, token )
    .then(result => {
      setUserData(result);
      setOuDivisionForPassword(result.ouDivision[0]);
      setStarted(true);
    },
    (error) => {
        setError(error);
        setStarted(true);
    })
  }

  // ADD login details for a website to the database
  function componentDidMountAddPassword(email, ouDivisionForPassword, title, website, username, password) {
    let method = "POST";
    let data = {email:email, ouDivision: ouDivisionForPassword, title:title, website:website, username:username,password:password};  

    // Fetch data from API and update
    api(`password/`, method ,data)
    .then(result => {
      setNewPasswordAdded(result);
      setIsLoaded(true);
    },
    (error) => {
      setErrorPassword(error);
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
  else if(error){
    return(
      <div>
        <h2>Login is required to view this page, visit home page</h2>
        <Link to="/" ><button >HOME</button></Link>
    </div>
    )
  }
  else if(addPassword=== false){
      return(<div>
        <h2>ADD NEW LOGIN CREDENTIALS</h2>
          <table>
            <tbody>
              <tr>
                  <td>OPERATING UNIT:</td>
                  <td>   
                      <select name="status" onChange={e => {setOuDivisionForPassword(e.target.value)}}>
                        {userData.ouDivision.map((element, index) =>{
                            return(
                              <option key={index} value={element}>{element}</option>
                            )
                         })}
                      </select>
                  </td>
              </tr>
              <tr>
                  <td>TITLE:</td>
                  <td><input name="title" type="text" onChange={e => {setTitle(e.target.value)}}/></td>
              </tr>
              <tr>
                  <td>WEBSITE:</td>
                  <td><input name="website" type="text" onChange={e => {setWebsite(e.target.value)}}/></td>
              </tr>
              <tr>
                  <td>USERNAME:</td>
                  <td><input name="username" type="text" onChange={e => {setUsername(e.target.value)}}/></td>
              </tr> 
              <tr>
                  <td>PASSWORD:</td>
                  <td><input name="password" type="text" onChange={e => {setPassword(e.target.value)}}/></td>
              </tr>                      
            </tbody>
          </table>
          <button className='options-Button' onClick={() =>{ componentDidMountAddPassword(userData.email, ouDivisionForPassword, title, website, username, password); setAddPassword(true)}}>ADD PASSWORD</button>
          <br/><br/>
        </div>
      )
  }
  else if (errorPassword) { return <div>Error: {errorPassword.message}</div>;
  } 
  else if (!isLoaded) { return <div>Loading...</div>;
  } 
  else {
      // Return result of Job that was added successfully
      return(
      <div>
          <h2>THANK YOU FOR YOUR CONTRIBUTION {userData.nickname.toUpperCase()} <br/>
          PASSWORD SUCCESSFULLY ADDED:</h2>   
          <table>
            <tbody>
              <tr>
                  <td>OPERATING UNIT:</td>
                  <td>{newPasswordAdded.ouDivision}</td>
              </tr>
              <tr>
                  <td>TITLE:</td>
                  <td>{newPasswordAdded.title}</td>
              </tr>
              <tr>
                  <td>WEBSITE:</td>
                  <td>{newPasswordAdded.website}</td>
              </tr>
              <tr>
                  <td>USERNAME:</td>
                  <td>{newPasswordAdded.username}</td>
              </tr> 
              <tr>
                  <td>PASSWORD:</td>
                  <td>{newPasswordAdded.password}</td>
              </tr>                    
            </tbody>
          </table>
          <button className='options-Button' onClick={() =>{ setAddPassword(false); setIsLoaded(false)}}>ADD NEW PASSWORD</button>
          <br/><br/>
      </div>
    )
  }
}

export default AddPassword