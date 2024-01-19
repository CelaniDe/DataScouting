import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();


    const login = (user_info) => {
        const {id : jwt} = user_info;
        localStorage.setItem('jwt', jwt);
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

    const getPlayerId = () => {
        return localStorage.getItem("jwt");
    }

    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, getPlayerId }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;