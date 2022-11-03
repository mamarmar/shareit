import React from "react";
//React Router
import { Link } from "react-router-dom";
//MUI
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

function SignUpPrompt({ setShowSignUpPrompt }) {
  function closePopUp() {
    setShowSignUpPrompt(false);
  }

  return (
    <Box
      sx={{
        borderRadius: 1,
        position: "fixed",
        top: {xs:"50%", md:"45%"},
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: {xs: 300,md:300},
        height:{xs:240, md:240},
        bgcolor: "common.white",
        boxShadow: 24,
        p: 2,
        zIndex: 1,
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems:"center"
      }}
    >
      <Tooltip title="Exit">
      <CloseIcon 
        onClick={closePopUp}
        sx={{
          fontSize:{xs: 32,md:30},
          alignSelf:"end",
          cursor:"pointer",
          position:"absolute",
          top:15,
        }}
      ></CloseIcon>
      </Tooltip>
      <Typography
        variant="p"
        sx={{
          fontWeight:300,
          fontSize:{xs:28, md:22},
          textAlign:"center"
        }}
      >
        Please &nbsp;
        <Link 
          to="/signup"
          style={{
            color:"#03A9F4",
            fontWeight:500
          }}
        >sign up</Link>
        &nbsp; to see item details.
      </Typography>
    </Box>
  );
}

export default SignUpPrompt;
