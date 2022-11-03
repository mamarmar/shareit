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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Stack from '@mui/material/Stack';
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
//Form Validation
import { useForm } from "react-hook-form";
//Greek cities
import citiesArray from "../../json-files/cities.json";

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
  
  const [successfulSubmit, setSuccessfulSubmit] = React.useState(false);
  const [unsuccessfulSubmit, setUnsuccessfulSubmit] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  //City value state for MUI Autocomplete
  const [cityValue, setCityValue] = React.useState(null);

  const cities = citiesArray.map(item => {
    return (`${item.city}, ${item.admin_name}`);
  })

  const navigate = useNavigate();
  const { register, watch, handleSubmit, formState: { errors } } = useForm();

  // //Image Input
  // const handleInputState = (name, value) => {
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // Create new user  when form is submitted
  async function submitForm(data) {
    data.city = cityValue;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/signup`,
        data
      );
      const token = res.data.token;
      localStorage.setItem("shareItToken", token);
      setUnsuccessfulSubmit(false);
      setSuccessfulSubmit(true);
      setTimeout(()=> {
        navigate("/");
        window.location.reload()
      }, 2000);
    }catch(err) {
      setUnsuccessfulSubmit(true);
      setErrorMessage(err.response.data);
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
          {/* Conditionally render success or error message */}
          {successfulSubmit &&
            <Stack direction="row" alignItems="center" gap={1} sx={{color:'success.main', mt:2}}>
              <CheckCircleOutlineIcon/>
              <Typography> You have successfully signed up! </Typography>
            </Stack>}
          {unsuccessfulSubmit &&
            <Stack direction="row" alignItems="center" gap={1} sx={{color:'error.main', mt:2, alignSelf:"center"}}>
              <ErrorOutlineIcon/>
              <Typography> {errorMessage || "An error occurred. Please try again later."} </Typography>
            </Stack>}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(submitForm)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  autoFocus
                  autoComplete="given-name"
                  id="firstName"
                  label="First Name"
                  {...register("firstName", { required: "Required field"})}
                  error={!!errors?.firstName}
                  helperText={errors?.firstName ? errors.firstName.message : null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  {...register("lastName", { required: "Required field"})}
                  error={!!errors?.lastName}
                  helperText={errors?.lastName ? errors.lastName.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register("email",{ 
                                required: "Required field",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Please provide a valid email"
                                }
                              }, )}
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", { 
                                required: "Required field",
                                minLength: {
                                  value: 8,
                                  message: "Minimum 8 characters"
                                },
                                pattern: {
                                  value: /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                  message: "At least one capital letter, at least one lowercase letter and at least one special character (!@#$%^&*) needed"
                                }
                              })}
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                  {...register("cpassword", { 
                                required: true,
                                validate: (val) => {
                                  if (watch('password') !== val) {
                                      return "Your passwords do not match"
                                  }
                                }
                              })}
                  error={!!errors?.cpassword}
                  helperText={errors?.cpassword ? errors.cpassword.message : null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="country-select-label">Country *</InputLabel>
                    <Select
                      required
                      labelId="country-select-label"
                      id="country-select"
                      label="Country"
                      {...register("country", { required: "Please select a country"})}
                      error={!!errors?.country}
                      helperText={errors?.country ? errors.country.message : null}
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
                  value={cityValue}
                  onChange={(e,newValue) => {setCityValue(newValue)}}
                  renderInput={(params) => <TextField {...params} label="City*"
                                              {...register("city", { required: "Please select a city"})}
                                              error={!!errors?.city}
                                              helperText={errors?.city ? errors.city.message : null}
                                            />}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  id="address"
                  autoComplete="address"
                  {...register("address", { required: "Required field"})}
                      error={!!errors?.address}
                      helperText={errors?.address ? errors.address.message : null}
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
