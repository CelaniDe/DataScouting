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
    uploadImage : async (image) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);

        var formdata = new FormData();
        console.log(image.originFileObj,"AAAAAAAAAAAa")
        formdata.append("file", image.originFileObj, image.name);

        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: myHeaders,
            body: formdata,
        };

        let endPoint = `api/images/detect_image`;
        const apiUrl = GetEndpoint() + endPoint;
        const apiUrlWithFilters = apiUrl;
        
        const response = await fetch(apiUrlWithFilters, requestOptions);
        // console.log('response', response);
        if(response.ok)
            return await response.body();
        throw new Error(response);
        
    },
}