import axios from "axios";
import React from "react";
//Components
import PopUp from "./PopUp";
import DeletePopUp from "./DeletePopUp";
import ImageCarousel from "../ImageCarousel"
//React Router
import { useLocation, Link } from "react-router-dom";
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

const OfferedItemPage = () => {
  const location = useLocation();
  const offeredItem = location.state;

  const [lender, setLender] = React.useState({});
  const [showPopUp, setShowPopUp] = React.useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = React.useState(false);

  const lenderId = offeredItem.offeredBy._id;
  const currentUserId = decode(localStorage.getItem("shareItToken")).user_id;

  React.useEffect(() => {
    visitLenderProfile();
  });

  function openPopUp() {
    setShowPopUp(true);
  }

  function openDeletePopUp() {
    setShowDeletePopUp(true);
  }

  //Go to user profile
  async function visitLenderProfile() {
    const token = localStorage.getItem("shareItToken");
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${offeredItem.offeredBy._id}`,
        config
      );
      setLender(res.data);
    } catch (err) {
      console.log({ error: err });
    }
  }

  return (
      <Box
        fullWidth
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems:{xs:"center", md:"stretch"},
          gap:5,
          mt: 8,
          mx: { xs: 3, md: 0 },
          px: 3,
        }}
      >
        {showPopUp && (
          <PopUp setShowPopUp={setShowPopUp} offeredItem={offeredItem} />
        )}
        {showDeletePopUp && (
          <DeletePopUp
            setShowDeletePopUp={setShowDeletePopUp}
            offeredItem={offeredItem}
            currentUserId={currentUserId}
          />
        )}
        <Box
          sx={{
            maxWidth: 500,
            minWidth: 320,
            width:"50%",
            mb:3
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: 32,
              }}
            >
              {offeredItem.itemName}
            </Typography>
            {/* Conditionally render button */}
            {lenderId === currentUserId ? (
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
                Request Item
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
                color: "grey.600",
                fontSize: 14,
              }}
            >
              {offeredItem.category}
            </Typography>
          </Stack>
          <Stack
            sx={{
              mb: 2,
            }}
          >
            <Typography
              sx={{
                color: "grey.600",
                fontSize: 14,
              }}
            >
              Description
            </Typography>
            <Box
              sx={{
                bgcolor: "grey.200",
                minHeight: "30px",
                p: 1,
                borderRadius: 1,
              }}
            >
              <Typography>{offeredItem.description}</Typography>
            </Box>
          </Stack>

          <Stack
            sx={{
              mb: 2,
            }}
          >
            <Typography
              sx={{
                color: "grey.600",
                fontSize: 14,
              }}
            >
              Condition
            </Typography>
            <Box
              sx={{
                bgcolor: "grey.200",
                minHeight: "30px",
                p: 1,
                borderRadius: 1,
              }}
            >
              <Typography>{offeredItem.condition}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Typography
              sx={{
                fontSize: 14,
                color: "grey.600",
              }}
            >
              Offered by
            </Typography>
            <Stack 
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                borderRadius:1,
                bgcolor:"grey.200",
                px:1,
                py:2,
                minWidth:140,
                width:"40%"
              }}
            >
              <Tooltip title="Visit Profile">
                <Link
                  to={`/user/${offeredItem.borrowedBy._id}`}
                  state={lender}
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={visitLenderProfile}
                >
                  <Avatar
                    alt="user"
                    src={profilePic}
                    sx={{
                      width: {xs:50, md:70},
                      height: {xs:50, md:70},
                    }}
                  />
                </Link>
              </Tooltip>

              <Typography
                sx={{
                  fontSize:17
                }}
              >{offeredItem.offeredBy.firstName}</Typography>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            // maxWidth: 500,
            minWidth: 320,
            width:"50%",
            border:1,
            borderRadius:1,
            borderColor:"grey.400",
            p:3
          }}
        >
            <ImageCarousel />
        </Box>
      </Box>
  );
};

export default OfferedItemPage;
