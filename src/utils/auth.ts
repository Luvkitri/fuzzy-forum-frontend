import { Register } from '../ts/interfaces/res_interfaces';
import moment from 'moment';
import axios from 'axios';
import { LogedInUser } from '../ts/interfaces/res_interfaces';

export const setLocalStorage = (responseObj: Register) => {
    const expires = moment().add(responseObj.expiresIn);

    localStorage.setItem('token', responseObj.token);
    localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
}

export const isLoggedIn = () => {
    return !moment().isSameOrBefore(getExpiration());
}

export const isLoggedOut = () => {
    return moment().isSameOrBefore(getExpiration());
}

export const getExpiration = () => {
    const expiration = localStorage.getItem('expires') || '';

    if (expiration === '') {
        return moment().valueOf();
    }

    const expiresAt = JSON.parse(expiration);

    return expiresAt;
}

export const getJWT = () => {
    return localStorage.getItem('token');
}

export const getUserData = async () => {
    try {
        const result = await authAxios.get('/users/');
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: getJWT()
    }
});