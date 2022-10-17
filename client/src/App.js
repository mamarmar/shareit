import "./App.css"
//React Router
import { Route, Routes } from "react-router-dom";
//Components
import VisitorHeader from "./components/Header/VisitorHeader";
// import Header from "./components/Header/Header";
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
      <VisitorHeader />
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/howitworks" element={<HowItWorks />}/>
        <Route path="/signup" element={<SignupForm />}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/offered/new" element={<OfferedItemForm />}/>
        <Route path="/offered/visitor" element={<OfferedItemGrid />}/>
        <Route path="/requested/new" element={<RequestedItemForm />}/>
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
