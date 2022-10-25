import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import {api} from '../Api';

function EditUserRights() {

  // Get the token from Session storage
  let token = sessionStorage.getItem("token");

  // Declare state
  const[started, setStarted]= useState(false);
  const[error,setError] = useState(null);
  const[isLoaded,setIsLoaded] = useState(false);
  const[editModeUsers,setEditModeUsers] = useState(false);
  const[updatedOURole,setUpdatedOURole] = useState(false);

  //User information:
  const[userData,setUserData] = useState([]);

  // Information of all the users
  const[displayUserData,setDisplayUserData] = useState([]);

  // User information - state used while updating information
  const[id,setId] = useState([]);
  const[email,setEmail] = useState([]);
  const[nickname,setNickname] = useState([]);
  const[password,setPassword] = useState([]);
  const[role,setRole] = useState([]);
  const[ouDivision,setOuDivision] = useState([]);

  // Selector Data - placeholders before added combination to ouDivision
  const[OU,setOU] = useState("NEWS MANAGEMENT");
  const[department,setDepartment] = useState("GENERAL MANAGEMENT");

  // Add the ouDivision data if the ou Division department is not already added
  function setAddOuDivionToUser(OU, department){
    
    let combination  = `${OU} - ${department}`;
    const index = ouDivision.indexOf(combination);

    if(index === -1){
      let oldOUDivision = ouDivision;
      oldOUDivision.push(combination);
      setOuDivision(oldOUDivision);
    }
  }

  // Validate the token that the user have right to view page
  // Get the user Data from the API
  function componentDidMountLoginValidation(token) {
    let method = "GET";
    let data = null;

    // Fetch data from API and update
    api(`verifypasswordspage/`, method ,data, token )
    .then(result => {
      setStarted(true);
      setUserData(result);
      setIsLoaded(true);
    },
    (error) => {
      setStarted(true);
      setError(error);
      setIsLoaded(true);
    })
  }

  // Display All the users that are on the Database
  function componentDidMountDisplayUsers() {
    let method = "GET";
      
    // Fetch data from API and update
    api(`users/`, method)
    .then(result => {
        setDisplayUserData(result.result) 
    },
    (error) => {
        setError(error);
    })
  }

  // Delete a user from the database by the user' id
  function componentDidMountDeleteUser(id) {
    let method = "DELETE";
    let data = {id:id};

    // Fetch data from API and update
    api(`users/`, method ,data)
    .then(result => {
        setEmail(result.email);
        setStarted(false);  
        setIsLoaded(false);
        setEditModeUsers(false);
        setUpdatedOURole(false);
    },
    (error) => {
        setError(error);
        setIsLoaded(true);
        setUpdatedOURole(false)
    })
  }

  // Update the information of a user on the database
  function componentDidMountUpdateUser(id, email,nickname,password, ouDivision, role) {
    let method = "PUT";
    let data = {id:id, email:email, nickname:nickname, password:password, ouDivision:ouDivision,role:role};

    // Fetch data from API and update
    api(`users/`, method ,data)
    .then(result => {
        setEmail(result.email);
        setStarted(false);  
        setIsLoaded(false);
        setEditModeUsers(false);
        setUpdatedOURole(false)
    },
    (error) => {
        setError(error);
        setIsLoaded(true);
        setUpdatedOURole(false)
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
    componentDidMountDisplayUsers();
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
  else if( userData.role === "normal" ||  userData.role === "manager"){
    return(
        <div>
            <h3>Dear {userData.nickname}, <br/><br/> Access denied, you don't have permission to edit other user' rights</h3>
            <br/><hr/>
        </div>
    )
  }
  else if( !editModeUsers && userData.role === "admin"){
    return(
     <div>
        <h2>USER ACCOUNTS</h2>
        <table>
            <thead>
                <tr>
                <th>NICKNAME</th><th>EMAIL</th><th>PASSWORD</th><th>ROLE</th><th>EDIT INFO</th>
                </tr>
            </thead>
            <tbody>
                {displayUserData.map((element, index)=> {
                    return(
                        <tr key={index}>
                            <td>{element.nickname}</td>
                            <td>{element.email}</td>
                            <td>{element.password}</td>
                            <td>{element.role}</td>
                            <td><button onClick={() =>{ setEditModeUsers(true); setId(element._id); setEmail(element.email); setNickname(element.nickname); 
                            setOuDivision(element.ouDivision); setPassword(element.password); setRole(element.role)}}>EDIT</button></td> 
                              
                        </tr> 
                    )})
                    }
            </tbody>
        </table>
        
        <br/><hr/>
      </div>
    )
  }
  else if( editModeUsers && !updatedOURole){
    setUpdatedOURole(true);
  }
  else if( editModeUsers && userData.role === "admin"){
    return(
      <div>
        <h2>EDIT LOGIN CREDENTIALS</h2>
        <table>
            <tbody>
                <tr>
                    <td>NICKNAME:</td>
                    <td><input name="nickname" type="text" value={nickname} onChange={e => {setNickname(e.target.value)}}/></td>
                </tr>
                <tr>
                    <td>EMAIL:</td>
                    <td><input name="email" type="text" value={email} onChange={e => {setEmail(e.target.value)}}/></td>
                </tr>

                <tr>
                    <td>PASSWORD:</td>
                    <td><input name="password" type="text" value={password} onChange={e => {setPassword(e.target.value)}}/></td>
                </tr>
                <tr>
                    <td>ROLE:</td>
                    <td>
                      <select name="role" value={role} onChange={e => {setRole(e.target.value)}}>   
                        <option value="normal">normal</option>
                        <option value="manager">manager</option>
                        <option value="admin">admin</option>     
                      </select>
                    </td>
                </tr>
              </tbody>
          </table>
          <br/>
          <br/>
          <table>
              <tbody>
                <tr>
                    <td colSpan={2}><b>OPERATING UNIT-DIVISION:</b></td>
                </tr> 
                {ouDivision.map((element, index) =>{
                  return(
                    <tr>
                      <td key={index}>{element}</td>
                      <td><button onClick={() =>{ouDivision.splice(index,1) ; setUpdatedOURole(false)}}>REMOVE</button></td>
                    </tr>
                  )
                })}
            </tbody>
        </table>
        <br/>
        <br/>
        <table>
            <tbody>
              <tr>
                <td><b>ORGANISATION UNIT: </b></td>
                <td><b>DEPARTMENT: </b></td>
              </tr>
              <tr>
              <td>     
                  <select name="ou" onChange={e => {setOU(e.target.value)}}>
                    <option value="NEWS MANAGEMENT">NEWS MANAGEMENT</option>
                    <option value="SOFTWARE REVIEWS">SOFTWARE REVIEWS</option>
                    <option value="HARDWARE REVIEWS">HARDWARE REVIEWS</option>
                    <option value="OPINION PUBLISHING">OPINION PUBLISHING</option>
                    <option value="NEW TECHNOLOGY REVIEWS">NEW TECHNOLOGY REVIEWS</option>
                  </select>
                </td>
                <td>     
                  <select name="department" onChange={e => {setDepartment(e.target.value)}}>
                    <option value="GENERAL MANAGEMENT">GENERAL MANAGEMENT</option>
                    <option value="MARKETING">MARKETING</option>
                    <option value="OPERATIONS">OPERATIONS</option>
                    <option value="FINANCE">FINANCE</option>
                    <option value="SALES">SALES</option>
                    <option value="HUMAN RESOURCES">HUMAN RESOURCES</option>
                    <option value="PROCUREMENT">PROCUREMENT</option>
                    <option value="PRODUCT DEVELOPMENT">PRODUCT DEVELOPMENT</option>
                    <option value="RESEARCH">RESEARCH</option>
                    <option value="LEGAL">LEGAL</option>
                  </select>
                </td>
              </tr>
              <tr>      
                <td colSpan={2}><button id='add-ouDivision-Button' onClick={() =>{ setAddOuDivionToUser(OU, department); setUpdatedOURole(false)}}>ADD OU DIVISION</button></td>
              </tr>
            </tbody>
        </table>
        <br/>
        <button className='options-Button' onClick={() =>{ componentDidMountDeleteUser(id);}}>DELETE USER</button>
        <button className='options-Button' onClick={() =>{ componentDidMountUpdateUser(id, email,nickname,password, ouDivision, role)}}>SAVE UPDATE</button>
        <br/><br/>
        <button className='options-Button' onClick={() =>{ setEditModeUsers(false); setOU("NEWS MANAGEMENT"); setDepartment("GENERAL MANAGEMENT")}}>BACK</button>    
        <br/>
        <hr/>
    </div>
    )
  }
}

export default EditUserRights