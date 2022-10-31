import axios from "axios";
//Components
// import ImageInput from "../ImageInput/ImageInput";
//React Router
import { useNavigate } from "react-router-dom";
//MUI
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//Greek cities
import citiesArray from "../../json-files/cities.json"

const theme = createTheme({
  typography: {
    fontFamily:"Poppins",
    fontWeightLight:300,
    fontWeightRegular:400,
    fontWeightMedium:500,
    fontWeightBold:700
  }
});

export default function SignUp() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    city: null,
    address: "",
    profilePic: "",
  });
  //City value state for MUI Autocomplete
  const [cityValue, setCityValue] = React.useState(null);

  const cities = citiesArray.map(item => {
    return (`${item.city}, ${item.admin_name}`);
  })

  const navigate = useNavigate();

  //Handle change of multiple inputs
  function handleChange(e) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  }

  // //Image Input
  // const handleInputState = (name, value) => {
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // Create new user  when form is submitted
  async function handleSubmit(event) {
    event.preventDefault();
    formData.city = cityValue;
    console.log(formData)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/signup`,
        formData
      );
      const token = res.data.token;
      localStorage.setItem("shareItToken", token);
      navigate("/requested/new");
      window.location.reload();
    } catch (err) {
      console.log("Could not send input");
      console.log(err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={formData.firstName}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={formData.password}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="country-select-label">Country*</InputLabel>
                    <Select
                      required
                      labelId="country-select-label"
                      id="country-select"
                      name="country"
                      value={formData.country}
                      label="Country"
                      onChange={handleChange}
                    >
                      <MenuItem value={'Greece'}>Greece</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cities}
                  required
                  value={cityValue}
                  onChange={(e,newValue) => setCityValue(newValue)}
                  renderInput={(params) => <TextField {...params} label="City*"/>}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  value={formData.address}
                  label="Address"
                  id="address"
                  autoComplete="address"
                  onChange={handleChange}
                />
              </Grid>

              {/* <Grid item xs={12}>
                <ImageInput 
                  type="image"
                  name="profilePic"
                  value={formData.profilePic}
                  label="Choose a profile picture"
                  handleInputState={handleInputState}
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor:'primary.light', fontSize:"16px"}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
