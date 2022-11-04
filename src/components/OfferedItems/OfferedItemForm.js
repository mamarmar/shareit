import axios from "axios";
//MUI
import * as React from "react";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from '@mui/material/Autocomplete';
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

export default function OfferedItemForm() {

  const [successfulSubmit, setSuccessfulSubmit] = React.useState(false);
  const [unsuccessfulSubmit, setUnsuccessfulSubmit] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  //City value state for MUI Autocomplete
  const [cityValue, setCityValue] = React.useState(null);

  const cities = citiesArray.map(item => {
    return (`${item.city}, ${item.admin_name}`);
  })

  const categories= [
    "Home Goods",
    "Office Supplies",
    "Garden & Outdoor",
    "Toys & Games",
    "Arts & Crafts",
    "Storage",
    "Clothing",
    "Vehicles",
    "Furniture",
    "Hobbies",
    "Electronics",
    "Musical Instruments",
    "Sports",
    "Kids & Baby",
    "Party & Events",
    "Holiday & Travel",
    "Pet Supplies"
  ];

  const { register, watch, handleSubmit, formState: { errors } } = useForm();

  //Create new offered item when form is submitted
  async function offerItem(data) {
    data.city = cityValue;
    const token = localStorage.getItem("shareItToken");
    let config = {
      headers: {
        'x-access-token': token
      }
    };
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/offereditems/form`, data, config);
      setUnsuccessfulSubmit(false);
      setSuccessfulSubmit(true);
      setTimeout(()=> {
        window.location.reload()
      }, 1500);
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Offer an Item
          </Typography>
          {/* Conditionally render success or error message */}
          {successfulSubmit &&
            <Stack direction="row" alignItems="center" gap={1} sx={{color:'success.main', mt:2}}>
              <CheckCircleOutlineIcon/>
              <Typography> You have successfully offered an item! </Typography>
            </Stack>}
          {unsuccessfulSubmit &&
            <Stack direction="row" alignItems="center" gap={1} sx={{color:'error.main', mt:2, alignSelf:"center"}}>
              <ErrorOutlineIcon/>
              <Typography> {errorMessage || "An error occurred. Please try again later."} </Typography>
            </Stack>}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(offerItem)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="item-name"
                  fullWidth
                  id="itemName"
                  label="What item?"
                  autoFocus
                  // onChange={handleChange}
                  {...register("itemName", { required: "Required field"})}
                  error={!!errors?.itemName}
                  helperText={errors?.itemName ? errors.itemName.message : null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                  <InputLabel id="category-select-label">Category* </InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      label="Category"
                      {...register("category", { required: "Please select a category"})}
                      error={!!errors?.category}
                      helperText={errors?.category ? errors.category.message : null}
                    >
                      {categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  multiline
                  rows={2}
                  id="description"
                  label="Description"
                  autoComplete="description"
                  {...register("description", { required: "Please provide a short description"})}
                  error={!!errors?.description}
                  helperText={errors?.description ? errors.description.message : null}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
                  <InputLabel id="condition-select-label">Condition*</InputLabel>
                    <Select
                      labelId="condition-select-label"
                      id="condition-select"
                      label="Condition"
                      {...register("condition", { required: "Please select item condition"})}
                      error={!!errors?.condition}
                      helperText={errors?.condition ? errors.condition.message : null}
                    >
                      {["Used", "Slightly Used", "Like New", "Brand New"].map(condition => <MenuItem key={condition} value={condition}>{condition}</MenuItem>)}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
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
              {/* <Grid item xs={12}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button variant="contained" component="label">
                    Item Image
                    <input 
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      name="itemImages"
                      value={formData.itemImages}
                      onChange={handleChange}
                    />
                  </Button>
                  <IconButton
                    color="primary"
                    aria-label="upload profile picture"
                    component="label"
                  >
                    <input 
                      accept="image/*"
                      multiple
                      type="file"
                      name="itemImages"
                      value={formData.itemImages}
                      onChange={handleChange}
                    />
                    <PhotoCamera />
                  </IconButton>
                </Stack>
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor:"primary.light", fontSize:"16px" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}