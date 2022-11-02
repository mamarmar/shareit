import React from "react";
import axios from "axios";
//Components
import PopUp from "./PopUp";
import DeletePopUp from "./DeletePopUp";
//React Router
import { Link, useLocation } from "react-router-dom";
//Decode JWT
import decode from "jwt-decode";
//MUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
//Image
import profilePic from "../../images/user-image.jpeg";

const RequestedItemPage = () => {
  const location = useLocation();
  const requestedItem = location.state;

  const [borrower, setBorrower] = React.useState({});
  const [showPopUp, setShowPopUp] = React.useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = React.useState(false);

  const borrowerId = requestedItem.borrowedBy._id;
  const currentUserId = decode(localStorage.getItem("shareItToken")).user_id;

  React.useEffect(() => {
    visitBorrowerProfile();
  }, []);

  function changeDateFormat(string) {
    const shortened = string.split("T")[0];
    const date = new Date(shortened).toString();
    return date.substring(4, 15);
  }

  function openPopUp() {
    setShowPopUp(true);
  }

  function openDeletePopUp() {
    setShowDeletePopUp(true);
  }

  //Go to user profile
  async function visitBorrowerProfile() {
    const token = localStorage.getItem("shareItToken");
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${requestedItem.borrowedBy._id}`,
        config
      );
      setBorrower(res.data);
    } catch (err) {
      console.log({ error: err });
    }
  }

  return (
    <Box
      sx={{
        display:{xs:"flex", md:"block"},
        justifyContent:"center",
        mt:8,
        mx:{xs:3, md:0},
        px: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          minWidth:320,
          
        }}
      >
        {showPopUp && (
          <PopUp setShowPopUp={setShowPopUp} requestedItem={requestedItem} />
        )}
        {showDeletePopUp && (
          <DeletePopUp
            setShowDeletePopUp={setShowDeletePopUp}
            requestedItem={requestedItem}
            currentUserId={currentUserId}
          />
        )}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: 3,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: 32,
            }}
          >
            {requestedItem.itemName}
          </Typography>
          {/* Conditionally render button */}
          {borrowerId === currentUserId ? (
            <Tooltip title="Delete Item">
              <DeleteIcon
                sx={{
                  color: "primary.main",
                  fontSize: 30,
                  cursor: "pointer",
                }}
                onClick={openDeletePopUp}
              >
                Delete Item
              </DeleteIcon>
            </Tooltip>
          ) : (
            <Button
              variant="contained"
              onClick={openPopUp}
              sx={{
                color: "common.white",
              }}
            >
              Offer Item
            </Button>
          )}
        </Stack>
        <Stack
            sx={{
                mb: 2,
            }}
        >
          <Typography
            sx={{
                color:"grey.600",
                fontSize:14,
            }}
          >Description</Typography>
          <Box
            sx={{
              bgcolor: "grey.200",
              minHeight: "30px",
              p: 1,
              borderRadius: 1,
            }}
          >
            <Typography>{requestedItem.description}</Typography>
          </Box>
        </Stack>
        <Stack
            sx={{
                mb: 2,
            }}
        >
          <Typography
            sx={{
                color:"grey.600",
                fontSize:14,
            }}
          >Dates</Typography>
          <Box
            sx={{
              bgcolor: "grey.200",
              minHeight: "30px",
              p: 1,
              borderRadius: 1,
            }}
          >
            <Typography>{`${changeDateFormat(
              requestedItem.fromDate
            )} - ${changeDateFormat(requestedItem.toDate)}`}</Typography>
          </Box>
        </Stack>
        <Stack>
          <Typography
            sx={{
                fontSize:14,
                mb:1
            }}
          >
            Requested by
        </Typography>
          <Stack direction="row" alignItems="baseline">
            <Tooltip title="Visit Profile">
            <Link
              to={`/user/${requestedItem.borrowedBy._id}`}
              state={borrower}
              style={{ textDecoration: "none", color: "black" }}
              onClick={visitBorrowerProfile}
            >
              <Avatar
                alt="user"
                src={profilePic}
                sx={{
                  width: 70,
                  height: 70,
                }}
              />
            </Link>
            </Tooltip>

            <Typography>{requestedItem.borrowedBy.firstName}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default RequestedItemPage;
