import axios from "axios";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

export const axiosInstancePublic = axios.create({
    baseURL: apiEndpoint,
    timeout: 1000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
});

export const axiosInstancePrivate = axios.create({
    baseURL: apiEndpoint,
    timeout: 1000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
        'Content-Type': 'application/json',
    }
});
