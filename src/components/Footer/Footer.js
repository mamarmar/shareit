import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
//React Router
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
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
            <Link
              to="/about"
              style={{
                textDecoration: "none",
              }}
            >
              <Button>About Us</Button>
            </Link>
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
              &nbsp;by&nbsp;
              <Link
                href="https://github.com/mamarmar"
                style={{
                  textDecoration: "none",
                  color: "#50C3F7",
                }}
              >
                Margarita Marmaridou
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
