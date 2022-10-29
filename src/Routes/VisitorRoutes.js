//Components
import VisitorHeader from "../components/Header/VisitorHeader";
import Footer from "../components/Footer/Footer";
import Homepage from "../components/Homepage/Homepage";
import About from "../components/About/About";
import HowItWorks from "../components/About/HowItWorks";
import SignupForm from "../components/Signup/SignupForm";
import LoginForm from "../components/Login/LoginForm";
import VisitorOfferedItemGrid from "../components/OfferedItems/VisitorOfferedItemGrid";
//React Router
import { Route, Routes } from "react-router-dom";
//Context
import OfferedItemsProvider from "../context/OfferedItemContext";

function VisitorRoutes() {
  return (
    <div>
      <OfferedItemsProvider>
        <VisitorHeader />
      </OfferedItemsProvider>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/offered/visitor"
          element={
            <OfferedItemsProvider>
              <VisitorOfferedItemGrid />
            </OfferedItemsProvider>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default VisitorRoutes;
