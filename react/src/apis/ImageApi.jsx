import { GetEndpoint } from "./apiConfig";


export const ImageAPI = {
    getAllMyImages : async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        let endPoint = `api/images/my`;
        const apiUrl = GetEndpoint() + endPoint;
        const apiUrlWithFilters = apiUrl;
        
        const response = await fetch(apiUrlWithFilters, requestOptions);
        if(response.ok)
            return await response.json();
        throw new Error(response);
        
    },
}