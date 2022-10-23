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
import OfferedItemPage from "./components/OfferedItems/OfferedItemPage";
import RequestedItemForm from "./components/RequestedItems/RequestedItemForm";
import RequestedItemGrid from "./components/RequestedItems/RequestedItemGrid";
import RequestedItemPage from "./components/RequestedItems/RequestedItemPage";
import Footer from "./components/Footer/Footer";
import UserProfile from "./components/User/UserProfile";

function App() {
  const [offeredItems, setOfferedItems] = React.useState([]);
  const [requestedItems, setRequestedItems] = React.useState([]);

  return (
    <div className="App">
       {localStorage.getItem("shareItToken")
       ? <Auth>
          <Header 
            offeredItems={offeredItems}
            setOfferedItems={setOfferedItems}
            requestedItems={requestedItems}
            setRequestedItems={setRequestedItems}
          />
       </Auth>
      : <VisitorHeader offeredItems={offeredItems} setOfferedItems={setOfferedItems}/>}
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
        <Route path="/offered/new" element={<OfferedItemForm />}/>
        <Route path="/offered/visitor" element={<OfferedItemGrid />}/>
        <Route path="/offered/:id" element={<OfferedItemPage />}/>
        <Route path="/requested/new" element={<RequestedItemForm />}/>
        <Route path="/requested/" element={<RequestedItemGrid requestedItems={requestedItems} setRequestedItems={setRequestedItems}/>}/>
        <Route path="/requested/:id" element={<RequestedItemPage />}/>
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;