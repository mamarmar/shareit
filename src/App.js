import "./App.css";
import React from "react";
//React Router
import { Route, Routes } from "react-router-dom";
//MUI
import { createTheme, colors, ThemeProvider } from "@mui/material";
//Context
import Auth from "../src/context/UserContext";
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

  const theme = createTheme({
    palette: {
      common: {
        black: "#131b23",
        white: "#FAF8F7",
      },
      primary: {
        main: colors.lightBlue[500],
        light:colors.lightBlue[300],
        dark:colors.lightBlue[700]
      },
      error: {
        main:colors.red[500]
      }, success: {
        main:colors.lightGreen[500]
      }
    },
    typography: {
      fontFamily:"Poppins",
      fontWeightLight:300,
      fontWeightRegular:400,
      fontWeightMedium:500,
      fontWeightBold:700
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {localStorage.getItem("shareItToken") ? (
          <Auth>
            <Header
              offeredItems={offeredItems}
              setOfferedItems={setOfferedItems}
              requestedItems={requestedItems}
              setRequestedItems={setRequestedItems}
            />
          </Auth>
        ) : (
          <VisitorHeader
            offeredItems={offeredItems}
            setOfferedItems={setOfferedItems}
          />
        )}
        <Routes>
          <Route path="/" element={<Homepage offeredItems={offeredItems} setOfferedItems={setOfferedItems}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/login"
            element={
              <Auth>
                <LoginForm />
              </Auth>
            }
          />
          <Route path="/offered/new" element={<OfferedItemForm />} />
          <Route
            path="/offered/visitor"
            element={
              <OfferedItemGrid
                offeredItems={offeredItems}
                setOfferedItems={setOfferedItems}
              />
            }
          />
          <Route path="/offered/:id" element={<OfferedItemPage />} />
          <Route path="/requested/new" element={<RequestedItemForm />} />
          <Route
            path="/requested/"
            element={
              <RequestedItemGrid
                requestedItems={requestedItems}
                setRequestedItems={setRequestedItems}
              />
            }
          />
          <Route path="/requested/:id" element={<RequestedItemPage />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
