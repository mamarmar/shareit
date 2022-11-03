import React from "react";
import axios from "axios";
//React Router
import { useNavigate } from "react-router-dom";
//MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/system/Stack";
import Button from "@mui/material/Button";

function DeletePopUp({ setShowDeletePopUp, requestedItem }) {
  const navigate = useNavigate();

  function closeDeletePopUp() {
    setShowDeletePopUp(false);
  }

  //Delete item - only if the current user is the one who created the listing
  async function deleteItem() {
    const token = localStorage.getItem("shareItToken");
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/requesteditems/${requestedItem._id}`,
        config
      );
      console.log(res);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log({ error: err });
    }
  }

  return (
    <Box
      sx={{
        borderRadius: 1,
        position: "fixed",
        top: { xs: "50%", md: "45%" },
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: 320, md: 420 },
        height: { xs: 180, md: 120 },
        bgcolor: "common.white",
        boxShadow: 24,
        p: 2,
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography
          variant="p"
          sx={{
            textAlign: "center",
          }}
        >
          Are you sure you want to delete this item?
        </Typography>
        <Stack direction="row" spacing={3}>
          <Button
            onClick={deleteItem}
            variant="outlined"
            color="error"
            size="large"
          >
            Delete
          </Button>
          <Button
            onClick={closeDeletePopUp}
            size="large"
            sx={{
              color: "grey.600",
              border: 1,
              borderColor: "grey.600",
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default DeletePopUp;
