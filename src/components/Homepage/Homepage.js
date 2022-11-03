import axios from "axios";
//MUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//React Router
import { Link } from "react-router-dom";

function Homepage({ offeredItems, setOfferedItems }) {
  //Get all offered items when button is clicked
  async function handleClick() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/offereditems/visitor`
      );
      setOfferedItems(res.data.data);
    } catch (err) {
      console.log("Could not fetch offered items");
      console.log(err);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "start" },
      }}
    >
      <Stack
        direction="column"
        alignItems={{ xs: "center", md: "start" }}
        spacing={{ xs: 5, md: 3 }}
        sx={{
          width: { xs: 300, md: "60%" },
          mx: { xs: 0, md: 20 },
          mt: { xs: 15, md: 20, xl: 30 },
        }}
      >
        <Stack spacing={1} alignItems={{ xs: "center", md: "start" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 26, md: 60 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Borrow & lend items within your community.
          </Typography>

          <Typography
            variant="p"
            sx={{
              fontSize: 16,
              textAlign: { xs: "center", md: "left" },
              color: "grey.600",
            }}
          >
            <Link
              to="/howitworks"
              style={{
                color: "#03A9F4",
                fontWeight: 500,
              }}
            >
              Find out more
            </Link>
            &nbsp;on how to get started.
          </Typography>
        </Stack>
        <Link
          to="/offered/visitor"
          style={{ textDecoration: "none" }}
          state={offeredItems}
        >
          <Button
            onClick={handleClick}
            variant="contained"
            size="large"
            sx={{
              color: "common.white",
              width: 300,
            }}
          >
            Explore Items
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default Homepage;
