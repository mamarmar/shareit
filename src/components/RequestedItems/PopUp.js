import React from "react";
import axios from "axios";
//Decode JWT
import decode from "jwt-decode";
//EmailJS
import { send } from "emailjs-com";
//MUI
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function PopUp({ setShowPopUp, requestedItem }) {
  const [toSend, setToSend] = React.useState({
    from_name: "",
    to_name: "",
    message: "",
    to_email: "",
    requestedItem: "",
    reply_to: "",
  });
  const [successfulSubmit, setSuccessfulSubmit] = React.useState(false);
  const [unsuccessfulSubmit, setUnsuccessfulSubmit] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");


  React.useEffect(() => {
    updateState();
  }, []);

  function handleChange(e) {
    setToSend((prevToSend) => {
      return {
        ...prevToSend,
        [e.target.name]: e.target.value,
      };
    });
  }
  //Update State
  async function updateState() {
    const token = localStorage.getItem("shareItToken");
    const decodedToken = decode(token);
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const borrower = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${requestedItem.borrowedBy._id}`,
        config
      );
      const currentUser = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${decodedToken.user_id}`,
        config
      );
      setToSend((prevToSend) => {
        return {
          ...prevToSend,
          from_name: currentUser.data.firstName,
          to_name: borrower.data.firstName,
          to_email: borrower.data.email,
          requestedItem: requestedItem.itemName,
          reply_to: currentUser.data.email,
        };
      });
    } catch (err) {
      console.log({
        Error: "Error when trying to update sender/receiver information",
      });
    }
  }

  //Send email when form is submitted
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (toSend.message.length > 0) {
        updateState();
      const res = await send(
        "service_t9haahr",
        "template_7g1qzln",
        toSend,
        "pNxISdWFiXKTiASCC"
      );
      setUnsuccessfulSubmit(false);
        setSuccessfulSubmit(true);
        setTimeout(() => {
          closePopUp();
        }, 1000);
      } else {
        setSuccessfulSubmit(false);
        setUnsuccessfulSubmit(true);
        setErrorMessage("Please type a message");
      }
    } catch (err) {
      setUnsuccessfulSubmit(true);
      setErrorMessage(err.response.data);
    }
  }

  function closePopUp() {
    setShowPopUp(false);
  }

  return (
      <Box
      sx={{
        borderRadius: 1,
        position: "fixed",
        top: { xs: "50%", md: "45%" },
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: 320, md: 480 },
        height: { xs: 400, md: 400 },
        bgcolor: "common.white",
        boxShadow: 24,
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Tooltip title="Exit">
        <CloseIcon
          onClick={closePopUp}
          sx={{
            fontSize: { xs: 32, md: 30 },
            alignSelf: "end",
            cursor: "pointer",
            position: "absolute",
            top: { xs: -15, md: 5 },
            right: { xs: -15, md: 2 },
          }}
        ></CloseIcon>
      </Tooltip>
      <Typography
        variant="h3"
        sx={{
          pb: 0,
          fontSize: 20,
          mt: 5,
        }}
      >
        Offer item to {requestedItem.borrowedBy.firstName}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",

          height: { xs: 270, md: 270 },
        }}
      >
        <TextField
          multiline
          placeholder="Type your message..."
          autoFocus
          rows={6}
          name="message"
          value={toSend.message}
          onChange={handleChange}
          sx={{
            width: 300,
            height: 340,
            mt: 4,
          }}
        ></TextField>
        <Button
          variant="contained"
          type="submit"
          sx={{
            color: "common.white",
          }}
        >
          {" "}
          Send
        </Button>
      </Box>
      {/* Conditionally render success or error message */}
      {successfulSubmit && (
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ color: "success.main", alignSelf: "center", mt: 2 }}
        >
          <CheckCircleOutlineIcon />
          <Typography> Your message has been sent! </Typography>
        </Stack>
      )}
      {unsuccessfulSubmit && (
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ color: "error.main", alignSelf: "center", mt: 2 }}
        >
          <ErrorOutlineIcon />
          <Typography>
            {" "}
            {errorMessage || "An error occurred. Please try again later."}{" "}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

export default PopUp;
