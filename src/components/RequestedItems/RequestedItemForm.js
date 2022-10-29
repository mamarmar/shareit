import axios from "axios";
//MUI
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function RequestedItemForm() {
  const [formData, setFormData] = React.useState({
    itemName:"",
    category:"",
    description:"",
    city:"",
    fromDate:"",
    toDate:"",
    indicativeImage:""
  });

  //Handle change of multiple inputs
  function handleChange(e) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  }

  //Create new requested item when form is submitted
  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("shareItToken");
    let config = {
      headers: {
        'x-access-token': token
      }
    };
    try {
      const res = await axios.post(`https://shareitapplication.herokuapp.com/requesteditems/form`, formData, config);
      console.log(res);
    }catch(err) {
        console.log("Could not create offered item");
        console.log(err);
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
            Request an Item
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
                  autoComplete="item-name"
                  name="itemName"
                  value={formData.itemName}
                  required
                  fullWidth
                  id="itemName"
                  label="What Item?"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  value={formData.category}
                  autoComplete="category"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  value={formData.description}
                  autoComplete="description"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  value={formData.city}
                  label="City"
                  id="city"
                  autoComplete="city"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fromDate"
                  name="fromDate"
                  value={formData.fromDate}
                  required
                  fullWidth
                  id="fromDate"
                  label="From Date"
                  type="date"
                  onChange={handleChange}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="toDate"
                  label="To date"
                  name="toDate"
                  value={formData.toDate}
                  autoComplete="toDate"
                  type="date"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button variant="contained" component="label">
                    Indicative Image
                    <input 
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      name="indicativeImage"
                      value={formData.indicativeImage}
                      onChange={handleChange}
                    />
                  </Button>
                  <IconButton
                    color="primary"
                    aria-label="upload profile picture"
                    component="label"
                  >
                    <input accept="image/*" type="file" />
                    <PhotoCamera />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
