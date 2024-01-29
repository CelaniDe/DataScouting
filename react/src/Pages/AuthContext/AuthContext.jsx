import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA celanide');
        const token = localStorage.getItem('jwt');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
            if (decodedToken.exp < Date.now() / 1000) {
                // Token has expired
                logout();
            } else {
                // setUser(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            }
        }
    },[])


    const login = (user_info) => {
        const {token} = user_info;
        localStorage.setItem('jwt', token);
        localStorage.setItem('user', JSON.stringify(user_info));
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const isLoggedIn = () => {
        let flag = false;

        //check user has jwt
        localStorage.getItem("jwt") ? (flag = true) : (flag = false);

        return flag;
    }

    const getUserId = () => {
        return localStorage.getItem("jwt");
    }

    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, getUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;