//Components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Homepage from "../components/Homepage/Homepage";
import About from "../components/About/About";
import HowItWorks from "../components/About/HowItWorks";
import SignupForm from "../components/Signup/SignupForm";
import LoginForm from "../components/Login/LoginForm";
import OfferedItemForm from "../components/OfferedItems/OfferedItemForm";
import OfferedItemGrid from "../components/OfferedItems/OfferedItemGrid";
import RequestedItemForm from "../components/RequestedItems/RequestedItemForm";
import RequestedItemGrid from "../components/RequestedItems/RequestedItemGrid";
//React Router
import { Route, Routes } from "react-router-dom";

function UserRoutes({ offeredItems, setOfferedItems }) {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/howitworks" element={<HowItWorks />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/offered/new" element={<OfferedItemForm />} />
                <Route path="/offered/" element={<OfferedItemGrid />} />
                <Route path="/requested/new" element={<RequestedItemForm />} />
                <Route path="/requested/" element={<RequestedItemGrid />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default UserRoutes;