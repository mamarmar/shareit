import "./App.css";
import React from "react";
//React Router
import { Route, Routes } from "react-router-dom";
//Context
import Auth from "./components/User/AuthContext";
//Components
import VisitorHeader from "./components/Header/VisitorHeader";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";
import About from "./components/About/About";
import HowItWorks from "./components/About/HowItWorks";
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from "./components/Login/LoginForm";
import OfferedItemForm from "./components/OfferedItems/OfferedItemForm";
import OfferedItemGrid from "./components/OfferedItems/OfferedItemGrid";
import RequestedItemForm from "./components/RequestedItems/RequestedItemForm"
import Footer from "./components/Footer/Footer";

function App() {
  
  return (
    <div className="App">
       {localStorage.getItem("shareItToken")
       ? <Auth>
          <Header />
       </Auth>
      : <VisitorHeader />}
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/howitworks" element={<HowItWorks />}/>
        <Route path="/signup" element={<SignupForm />}/>
        <Route path="/login" element={
          <Auth>
            <LoginForm />
          </Auth>
        }/>
        <Route path="/offered/new" element={
          <Auth>
            <OfferedItemForm />
          </Auth>
        }/>
        <Route path="/offered/visitor" element={
          <Auth>
            <OfferedItemGrid />
          </Auth>
        }/>
        <Route path="/requested/new" element={
          <Auth>
            <RequestedItemForm />
          </Auth>
        }/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
