import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
//React Router
import { Link } from "react-router-dom";
//Background
import background from "../../images/background.png";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage:`url(${background})`,
        backgroundSize: "cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        boxShadow:12,
        mt:5
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
          height: 100,
          bgcolor: "common.white",
          boxShadow: 7,
        }}
      >
        <Box
          fullWidth
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Stack direction="row" justifyContent={"space-around"}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Button>Home</Button>
            </Link>
            <Button disabled>About Us</Button>
            <Link
              to="/howitworks"
              style={{
                textDecoration: "none",
              }}
            >
              <Button>How it works</Button>
            </Link>
          </Stack>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography
              sx={{
                fontSize: 13,
              }}
            >
              Made with&nbsp;
            </Typography>
            <FavoriteIcon
              sx={{
                color: "primary.light",
                fontSize: 13,
              }}
            />
            <Typography
              sx={{
                fontSize: 13,
              }}
            >
              &nbsp;by Margarita Marmaridou
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
