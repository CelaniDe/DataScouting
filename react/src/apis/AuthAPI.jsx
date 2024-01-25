import { GetEndpoint } from "./apiConfig";

export const AuthAPI = {
    login : async (username,password) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "password": password,
        });

        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: myHeaders,
            body: raw,
        };

        let endPoint = `api/auth/login`;
        const apiUrl = GetEndpoint() + endPoint;
        const apiUrlWithFilters = apiUrl;
        
        const response = await fetch(apiUrlWithFilters, requestOptions);
        // console.log('response', response);
        if(response.ok)
            return await response.json();
        throw new Error(response);
        
    },
    register : async (username,email,password) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": username,
            "email": email,
            "password": password,
            "roles": "ROLE_USER",
        });

        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: myHeaders,
            body: raw,
        };

        let endPoint = `api/auth/register`;
        const apiUrl = GetEndpoint() + endPoint;
        const apiUrlWithFilters = apiUrl;
        
        const response = await fetch(apiUrlWithFilters, requestOptions);
        // console.log('response', response);
        if(response.ok)
            return await response.json();
        throw new Error(response);
        
    },
};