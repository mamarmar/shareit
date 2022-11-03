import axios from "axios";
//Logo
import logo from "../../images/logo.svg";
//React Router
import { Link } from "react-router-dom";
//MUI
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "mui-image";

const VisitorHeader = ({ offeredItems, setOfferedItems }) => {
  React.useEffect(() => {
    handleClick();
  }, []);

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
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "common.white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              flexGrow: 0,
            }}
          >
            <Link to="/">
              <Image
                src={logo}
                alt="logo"
                width="120px"
                component="a"
                duration={0}
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                }}
              />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "common.black",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link
                to="/offered/visitor"
                style={{ textDecoration: "none" }}
                state={offeredItems}
                onClick={handleClick}
              >
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ color: "common.black" }}
                >
                  <Typography textAlign="center">Offered Items</Typography>
                </MenuItem>
              </Link>
              <Link to="/howitworks" style={{ textDecoration: "none" }}>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ color: "common.black" }}
                >
                  <Typography textAlign="center">How it Works</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <Link to="/">
              <Image
                src={logo}
                alt="logo"
                width="100px"
                component="a"
                duration={0}
              />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              px: 1,
              gap: 2,
            }}
          >
            <Link
              to="/offered/visitor"
              style={{ textDecoration: "none" }}
              state={offeredItems}
            >
              <Button
                onClick={handleClick}
                sx={{
                  color: "common.black",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                Offered Items
              </Button>
            </Link>
            <Link to="/howitworks" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "common.black",
                  display: "block",
                }}
              >
                How it works
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  fontWeight: "bold",
                  marginRight: "5px",
                  whiteSpace: "no-wrap",
                  minWidth: "max-content",
                }}
                variant="outlined"
              >
                Log in
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  color: "common.white",
                  whiteSpace: "no-wrap",
                  minWidth: "max-content",
                }}
              >
                Sign up
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default VisitorHeader;
