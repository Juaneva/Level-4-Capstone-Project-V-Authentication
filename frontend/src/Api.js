// Use One centralized API function for all the methods
// Fetch data from API
export const api = (url, dataMethod, data, token) =>{
    
    // If data equals null, then know it is a token call
    if(data===null){
        return fetch(url, {
            method: dataMethod,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
                }
        })
        .then(response => response.json()); // parses response to JSON 
    }
    else{
        return fetch(url, {
            method: dataMethod,
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
        })
        .then(response => response.json()); // parses response to JSON 
    }         
};
