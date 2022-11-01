//MUI
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//Form Validation
import { useForm } from "react-hook-form";
//Greek cities
import citiesArray from "../json-files/cities.json";

const theme = createTheme();

export default function FiltersBar({ filterItems, setFilteredResults }) {
  //City value state for MUI Autocomplete
  const [cityValue, setCityValue] = React.useState(null);

  const cities = citiesArray.map((item) => {
    return `${item.city}, ${item.admin_name}`;
  });
  const categories = [
    "Home Goods",
    "Office Supplies",
    "Garden & Outdoor",
    "Toys & Games",
    "Arts & Crafts",
    "Storage",
    "Clothing",
    "Vehicles",
    "Electronics",
    "Musical Instruments",
    "Sports",
    "Kids & Baby",
    "Party & Events",
    "Holiday & Travel",
    "Pet Supplies",
  ];

  const { register, handleSubmit, reset } = useForm();

  function clearFilters() {
    setFilteredResults(false);
    reset({
      itemName: "",
      city: "",
      category: "",
    });
    window.location.reload();
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => filterItems(data))}
        noValidate
        sx={{
          pt: { xs: 2, md: 1 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flexStart",
          alignItems: "center",
          gap: { md: 4 },
          boxShadow: 3,
          // px:3
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            gap: 3,
            mx: { xs: 2, md: 3 },
            mb: { xs: 0 },
          }}
        >
          <TextField
            fullWidth
            id="itemName"
            label="Item Name"
            autoComplete="item-name"
            {...register("itemName")}
          />
          <Autocomplete
            fullWidth
            disablePortal
            id="combo-box-demo"
            options={cities}
            value={cityValue}
            onChange={(e, newValue) => {
              setCityValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="City" {...register("city")} />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Category"
              {...register("category")}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: 200,
            gap: 3,
            my: { xs: -1, md: 0 },
          }}
        >
          <Tooltip title="Apply filters">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "primary.light",
              }}
            >
              Apply
            </Button>
          </Tooltip>
          <Tooltip title="Clear filters">
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                borderColor: "grey.500",
                color: "grey.500",
              }}
              onClick={clearFilters}
            >
              Clear
            </Button>
          </Tooltip>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
