import axios from "axios";
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


const VisitorHeader = ({ offeredItems, setOfferedItems }) => {
  

  React.useEffect(() => {
    handleClick();
  }, []);

  //Get all offered items when button is clicked
  async function handleClick() {
    try {
      const res = await axios.get(`http://localhost:5000/offereditems/visitor`);
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ShareIt
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              <Link to="/offered/visitor" style={{textDecoration:"none", color:"black"}} state={offeredItems} onClick={handleClick}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Browse Offered Items</Typography>
                </MenuItem>
              </Link>
              <Link to="/howitworks" style={{textDecoration:"none", color:"black"}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">How it Works</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ShareIt
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link
              to="/offered/visitor"
              style={{ textDecoration: "none" }}
              state={offeredItems}
            >
              <Button
                style={{
                  backgroundColor: "#ED614C",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                variant="contained"
                onClick={handleClick}
              >
                Browse Offered Items
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  borderColor: "#ED614C",
                  backgroundColor:"white",
                  color:"#ED614C",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginRight:"5px"
                }}
                variant="outlined"
              >
                Log in
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  backgroundColor: "#ED614C",
                  fontSize: "14px",
                  fontWeight: "bold",
                  
                }}
                variant="contained"
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