import React from "react";
import axios from "axios";
import { useNavigate, useHistory } from "react-router-dom";

export const AuthContext = React.createContext();

function Auth({ children }) {
    const navigate = useNavigate();
    const history = useHistory();

    const handleLogin = async(data) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/login`, data);
            const token = res.data.user.token;
            localStorage.setItem('shareItToken', token);
            history.push("/requested/new");
            window.location.reload();
        }catch(err) {
            console.log(err);
        }
    };

    const handleLogOut = () => {
        localStorage.clear()
        navigate("login");
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ handleLogin, handleLogOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Auth;