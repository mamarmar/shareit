import React from "react";
import axios from "axios";
//Logo
import logo from "../../images/logo.svg";
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

const pages = [
  {
    title: "Offer an Item",
    linkTo: "/offered/new",
  },
  {
    title: "Request an Item",
    linkTo: "/requested/new",
  },
];

const Header = ({ offeredItems, setOfferedItems, requestedItems, setRequestedItems }) => {
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
      .get(`https://shareitapplication.herokuapp.com/search=${itemName}`)
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
        `https://shareitapplication.herokuapp.com/user/${decodedToken.user_id}`,
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
      const res = await axios.get(`https://shareitapplication.herokuapp.com/offereditems/visitor`);
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
      const res = await axios.get(`https://shareitapplication.herokuapp.com/requesteditems/`,config);
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
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
          </Typography> */}
          <Link to="/">
            <img src={logo} alt="logo" className="logo"></img>
          </Link>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="itemName"
              name="itemName"
              value={input.itemName}
              placeholder="Search offered items..."
              autofocus
              onChange={handleChange}
            />
          </Box>

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
              {pages.map((page) => (
                <Link
                  to={page.linkTo}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
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
            {pages.map((page) => (
              <Link to={page.linkTo} style={{ textDecoration: "none" }}>
                <Button
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  href={page.linkTo}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
              <Link to="/offered/visitor" style={{textDecoration:"none", color:"black"}} state={offeredItems} onClick={getAllOfferedItems}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    Browse Offered Items
                  </Typography>
                </MenuItem>
              </Link>
              <Link to="/requested" style={{textDecoration:"none", color:"black"}} state={requestedItems} onClick={getAllRequestedItems}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    Browse Requested Items
                  </Typography>
                </MenuItem>
              </Link>
              <MenuItem onClick={logOut}>
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
