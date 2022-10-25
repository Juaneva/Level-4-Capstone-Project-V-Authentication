import React,{useState} from 'react'
import { api } from '../Api';

function PasswordsDisplayEditPage(props) {
    // Pass the props
    const ouDivision = props.ouDivision;
    const userData = props.userData;

    const[credentialData,setCredentialData] = useState([]);
    const[error,setError] = useState(null);
    const[isStarted,setIsStarted] = useState(false);
    const[isLoaded,setIsLoaded] = useState(false);
    const[display,setDisplay] = useState(false);
    const[editDataDisplay,setEditDataDisplay] = useState(false);

    //State for edit data
    const[id,setId] = useState("");
    const[title,setTitle] = useState("");
    const[website,setWebsite] = useState("");
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");

    // Get all the login Usernames & Passwords
    function componentDidMountDisplayPasswords(ouDivision) {
        let method = "GET";
          
        // Fetch data from API and update
        api(`password/${ouDivision}`, method)
        .then(result => {
            setCredentialData(result.result)
            setIsLoaded(true);  
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        })
    }

    // Edit the login credentials by its ID
    function componentDidMountEditPasswords( email, id, title, website, username, password) {
        let method = "PUT";
        let data = {email:email, id:id, title:title, website:website, username:username,password:password};  

        // Fetch data from API and update
        api(`password/`, method ,data)
        .then(result => {
            setTitle(result.title);
            setIsLoaded(true);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        })
    }

    // Delete login credentials by its ID
    function componentDidMountDeletePasswords(id) {
        let method = "DELETE";
        let data = {id:id};  

        // Fetch data from API and update
        api(`password/`, method ,data)
        .then(result => {
            setTitle(result.title);
            setIsLoaded(true);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        })
    }

    // If user token does not pass the JWT test, don't have access to edit data
    if(isStarted === false){
        componentDidMountDisplayPasswords(ouDivision); 
        setIsStarted(true);
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    }
    else if(!display){
        return(
            <div>
                <br/>
                <button className='display-Passwords-Button' onClick={() =>{ setDisplay(true)}}>{ouDivision}</button>
                <br/><br/>
            </div>
        )
    }
    else if (!editDataDisplay) {
        //Return the search results
        return(
            <div>
                <h3>{ouDivision}:</h3>
                <table>
                    <thead>
                        <tr>
                        <th>TITLE</th><th>WEBSITE</th><th>USERNAME</th><th>PASSWORD</th><th>CREATED BY</th><th>EDIT INFO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {credentialData.map((element, index)=> {
                            return(
                                <tr key={index}>
                                    <td>{element.title}</td>
                                    <td>{element.website}</td>
                                    <td>{element.username}</td>
                                    <td>{element.password}</td>
                                    <td>{element.createdBy}</td>
                                    <td><button onClick={() =>{ setEditDataDisplay(true); setTitle(element.title); setWebsite(element.website); 
                                    setUsername(element.username); setPassword(element.password); setId(element._id)}}>EDIT</button></td>                 
                                </tr> 
                            )})
                            }
                    </tbody>
                </table>
                <button className='display-Passwords-Button' onClick={() =>{ setDisplay(false)}}>CLOSE SEARCH</button>
                <br/><hr/>
            </div>
        )
    }
    else if(editDataDisplay && userData.role === "normal" ){
        // If normal user rights, can not edit data
        return(
            <div>
                <h3>{ouDivision}:</h3>
                <h1>Access denied, you dont have user rights to amend passwords</h1>
                <button className='display-Passwords-Button' onClick={() =>{setEditDataDisplay(false)}}>BACK</button>
                <br/><hr/>
            </div>
        )
    }
    else if(editDataDisplay && (userData.role === "manager" || userData.role === "admin")){
        // Admins & Managers can edit - Display Edit fields & update button
        return(
        <div>
            <h2>EDIT LOGIN CREDENTIALS</h2>
            <table>
                <tbody>
                    <tr>
                        <td>TITLE:</td>
                        <td><input name="title" type="text" value={title} onChange={e => {setTitle(e.target.value)}}/></td>
                    </tr>
                    <tr>
                        <td>WEBSITE:</td>
                        <td><input name="website" type="text" value={website} onChange={e => {setWebsite(e.target.value)}}/></td>
                    </tr>
                    <tr>
                        <td>USERNAME:</td>
                        <td><input name="username" type="text" value={username} onChange={e => {setUsername(e.target.value)}}/></td>
                    </tr> 
                    <tr>
                        <td>PASSWORD:</td>
                        <td><input name="password" type="text" value={password} onChange={e => {setPassword(e.target.value)}}/></td>
                    </tr>                       
                </tbody>
            </table>
            <br/>
            <button className='options-Button' onClick={() =>{ componentDidMountDeletePasswords(id); setIsStarted(false); setIsLoaded(false); setEditDataDisplay(false);}}>DELETE ENTRY</button>
            <button className='options-Button' onClick={() =>{ componentDidMountEditPasswords(userData.email, id, title, website, username, password);  setIsStarted(false); setIsLoaded(false); setEditDataDisplay(false);}}>SAVE EDIT</button>
            <br/><br/>
            <button className='options-Button' onClick={() =>{ setEditDataDisplay(false)}}>BACK</button>
            <br/><hr/>
        </div>
    )}
}

export default PasswordsDisplayEditPage