import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

function Auth({ children }) {
    const [successfulSubmit, setSuccessfulSubmit] = React.useState(false);
    const [unsuccessfulSubmit, setUnsuccessfulSubmit] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const navigate = useNavigate();

    const handleLogin = async(data) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/login`, data);
            const token = res.data.user.token;
            localStorage.setItem('shareItToken', token);
            setUnsuccessfulSubmit(false);
            setSuccessfulSubmit(true);
            setTimeout(()=> {
                navigate("/requested/new");
                window.location.reload()
            }, 1000);
        }catch(err) {
            setUnsuccessfulSubmit(true);
            console.log(err)
            setErrorMessage(err.response.data);
        }
    };

    const handleLogOut = () => {
        localStorage.clear()
        navigate("login");
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ handleLogin, handleLogOut, successfulSubmit, unsuccessfulSubmit, errorMessage }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Auth;