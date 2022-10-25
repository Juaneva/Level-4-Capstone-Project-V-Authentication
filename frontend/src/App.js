import React,{useState} from 'react';
import {BrowserRouter as  Router, Route, Switch} from 'react-router-dom';
import { api } from './Api';

// Import the other pages
import Header from './headerMenu/Header';
import PasswordsDisplay from './passwords/PasswordsDisplay';
import PasswordsAdd from './passwords/PasswordsAdd';
import EditUserRights from './adminUserAccess/EditUserRights';


const App = () => {

  // Declare state
  // Set state for logged in, start false
  const[login,setLogin] = useState(false);
  const[isLoaded,setIsLoaded] = useState(false);
  const[error,setError] = useState(null);
  const[token,setToken] = useState([]);
  const[loginRegister,setLoginRegister] = useState("");
  
  // Based on if logged in or not, display login page or welcome page
  function Greeting(props){ 
    const login = props.login;
    if(login === true){
      return <UserIsLoggedIn/>;
    } else{
      return <UserIsNotLoggedIn/>;
    } 
  }
  
  // Function display welcome if user is logged in
  function UserIsLoggedIn(){
    return <div className="welcomeBackDiv">
      <h2>Logged In - Welcome to Cool Tech</h2>
    </div>
  }
  
  function UserIsNotLoggedIn(){
    
    // Declare all the onChange states inside the function for quicker response
    const[email,setEmail] = useState("");
    const[nickname,setNickname] = useState("");
    const[password,setPassword] = useState("");
    const[OU,setOU] = useState("NEWS MANAGEMENT");
    const[department,setDepartment] = useState("GENERAL MANAGEMENT");

    // Register the User
    function registerComponentDidMount(email,nickname,password,OU,department) {
      //Method Post(Add)
      let method = "POST";
      let ouDivision = OU+" - "+department

      // Structure data correct format
      let data = {email:email, nickname:nickname, password:password, ouDivision:ouDivision}
      
      // Fetch data from API and update
      api(`register/`,method,data)
      .then(result => {
        //Set the token in session storage
        sessionStorage.setItem("token", result.token);
        setToken(result);
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
      })
    }

    // Login with API if the User is already registered
    // Post email & password, get JWT token
    function loginComponentDidMount(email,password) {
      //Method Post(Add)
      let method = "POST";

      // Structure data correct format
      let data = {email:email, password:password}
      
      // Fetch data from API and update
      api(`login/`,method,data)
      .then(result => {
        //Set the token in session storage
        sessionStorage.setItem("token", result.token);
        setToken(result);
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
      })
    }

    if(loginRegister === ""){
      return (
        <div className="App">
          <h2>Welcome to Cool Tech</h2>
          <button onClick={() =>{ setLoginRegister("login")}}>LOGIN</button>
          <button onClick={() =>{ setLoginRegister("register")}}>REGISTER</button>
        </div>
      )
    }
    else if(loginRegister === "login"){
      return (
        <div className="App">
          <h2>Welcome to Cool Tech</h2>
          <table>
            <tbody>
              <tr>
                <td><b>EMAIL: </b></td>
                <td><input value={email}   name="email" onChange={e => {setEmail(e.target.value)}} type="text"/></td>
              </tr>
              <tr>
                <td><b>PASSWORD: </b></td>
                <td><input   name="password" onChange={e => {setPassword(e.target.value)}} type="password"/></td>
              </tr>
            </tbody>
          </table>
          <hr/>
          <button onClick={() =>{ setLoginRegister("")}}>BACK</button>
          <button onClick={() =>{ setLoginRegister("Login"); loginComponentDidMount(email,password)}}>SUBMIT</button>
          <br/><br/>
        </div>
      )

    } 
    else if(loginRegister === "register"){
      return (
        <div className="App">
          <h2>Welcome to Cool Tech</h2>
          <table>
            <tbody>
              <tr>
                <td><b>EMAIL: </b></td>
                <td><input value={email}   name="email" onChange={e => {setEmail(e.target.value)}} type="text"/></td>
              </tr>
              <tr>
                <td><b>NICK NAME: </b></td>
                <td><input value={nickname}   name="nickname" onChange={e => {setNickname(e.target.value)}} type="text"/></td>
              </tr>
              <tr>
                <td><b>PASSWORD: </b></td>
                <td><input   name="password" onChange={e => {setPassword(e.target.value)}} type="password"/></td>
              </tr>
              <tr>
                <td><b>ORGANISATION UNIT: </b></td>
                <td>     
                  <select name="ou" onChange={e => {setOU(e.target.value)}}>
                    <option value="NEWS MANAGEMENT">NEWS MANAGEMENT</option>
                    <option value="SOFTWARE REVIEWS">SOFTWARE REVIEWS</option>
                    <option value="HARDWARE REVIEWS">HARDWARE REVIEWS</option>
                    <option value="OPINION PUBLISHING">OPINION PUBLISHING</option>
                    <option value="NEW TECHNOLOGY REVIEWS">NEW TECHNOLOGY REVIEWS</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><b>DEPARTMENT: </b></td>
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
            </tbody>
          </table>
          <hr/>
          <button onClick={() =>{ setLoginRegister("")}}>BACK</button>
          <button onClick={() =>{ setLoginRegister("New Register"); registerComponentDidMount(email,nickname,password,OU,department)}}>REGISTER</button>
          <br/><br/>
        </div>
      )
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    }  
    else if (error) { return <div>Error: {error.message}</div>;
    }
    else if(loginRegister === "New Register" && token.token === "failed"){
      return (
        <div className="App">
          <h1>Cool Tech</h1>
          <h3>Registration Failed</h3>
          <br/>
          <h3>Please use your company email address (@cooltech.com) to register</h3>
          <br/>
          <p>If the problem persists, please contact our Website Admin department at <a href="mailto:admin@cooltech.com?subject=Please grant username access">  admin@cooltech.com </a></p>
        <button onClick={() =>{ setLoginRegister("")}}>BACK</button>
        </div>
      )
    }
    else if(loginRegister === "New Register" && token.token === "already registered"){
      return (
        <div className="App">
          <h1>Cool Tech</h1>
          <h3>Registration Failed</h3>
          <br/>
          <h3>Please Login, your account is already registered</h3>
          <br/>
          <p>If the problem persists, please contact our Website Admin department at <a href="mailto:admin@cooltech.com?subject=Please grant username access">  admin@cooltech.com </a></p>
        <button onClick={() =>{ setLoginRegister("")}}>BACK</button>
        </div>
      )
    }
    else if(loginRegister === "New Register"){
      return (
        <div className="App">
          <h1>Cool Tech</h1>
          <h2>Thank you for registration</h2>

          <p>If you need additional account rights, please contact our Website Admin department at <a href="mailto:admin@cooltech.com?subject=Please grant username access">  admin@cooltech.com </a> .</p>
        <button className='options-Button' onClick={() =>{setLoginRegister(""); setLogin(true) }}>HOME</button>
        </div>
      )
    }
    else if(loginRegister === "Login" && token.token === "failed"){
      return (
        <div className="App">
          <h1>Cool Tech</h1>
          <h3>Login Failed</h3>
          <br/>
          <p>If the problem persists, please contact our Website Admin department at <a href="mailto:admin@cooltech.com?subject=Please grant username access">  admin@cooltech.com </a></p>
        <button onClick={() =>{ setLoginRegister("")}}>BACK</button>
        </div>
      )
    }
    else if(loginRegister === "Login"){
      return (
        <div className="App">
          <h1>Cool Tech</h1>
          <h2>Successfully logged in</h2>

          <p>If you need additional account rights, please contact our Website Admin department at <a href="mailto:admin@cooltech.com?subject=Please grant username access">  admin@cooltech.com </a> .</p>
        <button className='options-Button' onClick={() =>{setLoginRegister(""); setLogin(true) }}>HOME</button>
        </div>
      )
    }

  }
  
  // Prevent user from seeing other options if not logged in
  if(login === false){
    return(<Greeting login = {false}/>)
  }
  else{
  // Display functions based on routing and state
    return(
      <Router>
        <Header/>
        <div>
          <Switch>
    
            <Route exact path="/">
              {login?<Greeting login = {true}/>:<Greeting login = {false}/>}    
            </Route>
      
            <Route exact path="/addpassword">
              <PasswordsAdd/>
            </Route>
      
            <Route exact path="/displaypasswords">
              <PasswordsDisplay/>
            </Route>

            <Route exact path="/edituserrights">
              <EditUserRights/>
            </Route>
    
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
