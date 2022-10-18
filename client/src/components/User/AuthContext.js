import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

function Auth({ children }) {
    const navigate = useNavigate();

    const handleLogin = async(data) => {
        try {
            const res = await axios.post(`http://localhost:5000/user/login`, data);
            const token = res.data.user.token;
            localStorage.setItem('shareItToken', token);
            navigate("/requested/new");
        }catch(err) {
            console.log(err);
        }
    };

    const handleLogOut = () => {
        localStorage.clear()
        navigate("login");
    };

    return (
        <AuthContext.Provider value={{ handleLogin, handleLogOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Auth;
