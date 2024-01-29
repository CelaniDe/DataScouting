import {Navigate} from 'react-router-dom';
import {useContext} from "react";
import AuthContext from './AuthContext';


export const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if(!isLoggedIn())
    {
        console.log('redirect');
        return <Navigate to="/login" replace />;
    }

    return children;
};