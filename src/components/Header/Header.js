import React from "react";
import axios from "axios";
//Logo
import logo from "../../images/logo.svg";
import profilePic from "../../images/user-image.jpeg"
//Context
import { AuthContext } from "../../context/UserContext";
//React Router
import { Link } from "react-router-dom";
//Decode JWT
import decode from "jwt-decode";
//MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import Image from "mui-image";

const Header = ({
  offeredItems,
  setOfferedItems,
  requestedItems,
  setRequestedItems,
}) => {
  
  const [input, setInput] = React.useState({
    itemName: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});

  const { handleLogOut } = React.useContext(AuthContext);

  React.useEffect(() => {
    handleProfileClick();
  }, []);

  React.useEffect(() => {
    getAllOfferedItems();
  }, []);

  React.useEffect(() => {
    getAllRequestedItems();
  }, []);

  //Handle change of multiple inputs
  function handleChange(e) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
    });
  }

  // Search for item based on item name (using the query parameters)
  function handleSubmit(e) {
    e.preventDefault();
    const itemName = input.itemName;
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/search=${itemName}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }

  //Go to user profile
  async function handleProfileClick() {
    const token = localStorage.getItem("shareItToken");
    const decodedToken = decode(token);
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${decodedToken.user_id}`,
        config
      );
      setCurrentUser(res.data);
    } catch (err) {
      console.log({ error: err });
    }
  }

  //Get all offered items when menu item is clicked
  async function getAllOfferedItems() {
    try {
      const res = await axios.get(
        `https://shareitapplication.herokuapp.com/offereditems/visitor`
      );
      setOfferedItems(res.data.data);
    } catch (err) {
      console.log("Could not fetch offered items");
      console.log(err);
    }
  }

  //Get all requested items when menu item is clicked
  async function getAllRequestedItems() {
    const token = localStorage.getItem("shareItToken");
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const res = await axios.get(
        `https://shareitapplication.herokuapp.com/requesteditems/`,
        config
      );
      setRequestedItems(res.data.data);
    } catch (err) {
      console.log({ error: err });
    }
  }

  //Log user out
  function logOut() {
    handleLogOut();
    handleCloseUserMenu();
  }

  //MUI
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "common.white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box>
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
          {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <TextField
              fullWidth
              id="itemName"
              name="itemName"
              value={input.itemName}
              placeholder="Search offered items..."
              autofocus
              onChange={handleChange}
            />
          </Box> */}

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
                onClick={getAllOfferedItems}
                state={offeredItems}
              >
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ color: "common.black" }}
                >
                  <Typography textAlign="center">
                    Offered Items
                  </Typography>
                </MenuItem>
              </Link>
              <Link
                to="requested"
                style={{ textDecoration: "none" }}
                onClick={getAllRequestedItems}
                state={requestedItems}
              >
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ color: "common.black" }}
                >
                  <Typography textAlign="center">
                    Requested Items
                  </Typography>
                </MenuItem>
              </Link>
              <Link to="/offered/new" style={{ textDecoration: "none" }}>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ color: "common.black" }}
                >
                  <Typography textAlign="center"> Offer an Item</Typography>
                </MenuItem>
              </Link>
              <Link to="/requested/new" style={{ textDecoration: "none" }}>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ color: "common.black" }}
                >
                  <Typography textAlign="center"> Request an Item</Typography>
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
                width="120px"
                component="a"
                duration={0}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" },gap:2 }}>
            <Link
              to={"/offered/visitor"}
              style={{ textDecoration: "none" }}
              onClick={getAllOfferedItems}
              state={offeredItems}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "common.black", display: "block", fontWeight: "bold",}}
              >
                Offered Items
              </Button>
            </Link>
            <Link
              to={"/requested"}
              style={{ textDecoration: "none" }}
              onClick={getAllRequestedItems}
              state={requestedItems}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "common.black", display: "block", fontWeight: "bold", }}
              >
                Requested Items
              </Button>
            </Link>
            <Link to={"/offered/new"} style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "common.black", display: "block", fontWeight: "bold", }}
              >
                Offer an Item
              </Button>
            </Link>
            
            <Link to={"/requested/new"} style={{ textDecoration: "none" }} >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "common.black", display: "block", fontWeight: "bold", }}
              >
                Request an Item
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <Image
                src={profilePic}
                alt="user"
                width="60px"
                height="50px"
                component="a"
                fit="cover"
                position="center"
                duration={0}
                sx={{
                  mr: 2,
                  borderRadius:"50%"
                }}
              />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px"}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link
                to={`/user/${currentUser._id}`}
                state={currentUser}
                onClick={handleProfileClick}
                style={{ textDecoration: "none" }}
              >
                <MenuItem onClick={handleCloseUserMenu} sx={{color:'common.black'}}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
              <Link
                to={`howitworks`}
                style={{ textDecoration: "none"}}
              >
                <MenuItem onClick={handleCloseUserMenu} sx={{color:'common.black'}}>
                  <Typography textAlign="center">How it works</Typography>
                </MenuItem>
              </Link>
              <MenuItem onClick={logOut} sx={{color:'common.black'}}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
