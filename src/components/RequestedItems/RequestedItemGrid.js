import React from "react";
import axios from "axios";
//Components
import RequestedItemCard from "./RequestedItemCard";
import FiltersBar from "../FiltersBar";
//React Router
import { useLocation } from "react-router-dom";
//MUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function RequestedItemGrid({ requestedItems, setRequestedItems }) {
  const [filteredResults, setFilteredResults] = React.useState(false);
  const [showFilterBar, setShowFilterBar] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    filterItems();
  });

  function toggleFilterBar() {
    setShowFilterBar((prevValue) => !prevValue);
  }

  //Get filtered requested items when form is submitted
  async function filterItems(data) {
    console.log(data);
    const token = localStorage.getItem("shareItToken");
    let config = {
      params: {
        itemName: data.itemName ? data.itemName : null,
        city: data.city ? data.city : null,
        category: data.category ? data.category : null,
      },
      headers: { "x-access-token": token },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/requesteditems/search`,
        config
      );
      setShowAlert(false);
      if (res.data.data.length === 0) {
        setShowAlert(true);
      } else {
        setRequestedItems(res.data.data);
        setFilteredResults(true);
      }
    } catch (err) {
      console.log({ error: err });
    }
  }

  //Map over the incoming data and create a RequestedItemCard for every document
  const allRequestedItems = location.state.map((item) => {
    return (
      <Grid
        item 
        xs={2}
      >
      <RequestedItemCard
        key={item._id}
        id={item._id}
        itemName={item.itemName}
        itemImages={item.itemImages}
        city={item.city}
      />
      </Grid>
    );
  });

  const filteredRequestedItems = requestedItems.map((item) => {
    return (
      <RequestedItemCard
        key={item._id}
        id={item._id}
        itemName={item.itemName}
        itemImages={item.itemImages}
        city={item.city}
      />
    );
  });

  return (
    <div>
      {showFilterBar && (
        <FiltersBar
          setFilteredResults={setFilteredResults}
          filterItems={filterItems}
          showAlert={showAlert}
        />
      )}
      <Typography
        variant="h1"
        sx={{
          display:{xs:"none", md:"inline"},
          position:"absolute",
          right:-5,
          my:2,
          bgcolor:"primary.light",
          color:"common.white",
          fontSize:"24px",
          p:1.1,
          borderRadius:1
        }}
      >Requested Items </Typography>
      <Stack
        direction={{ md: "row", xs: "column" }}
        sx={{
          alignItems: "center",
          justifyContent: { xs: "center", md: "start" },
          mx: 3,
          mt: 3,
          gap: 2,
        }}
      >
        <Tooltip title="Toggle Filter Bar">
          <Button
            variant="outlined"
            onClick={toggleFilterBar}
            sx={{
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {showFilterBar ? "Filters ▲" : "Filters ▼"}
          </Button>
        </Tooltip>
        {showAlert && (
          <Typography
            sx={{
              color: "warning.main",
              textAlign:"center"
            }}
          >
            There are no results matching your search. Please modify your
            filters.
          </Typography>
        )}
      </Stack>
      <Grid 
        container
        spacing={{ xs: 2, md: 5}}
        columns={{ xs: 3, sm: 6, md:9}}
        justifyContent="center"
        sx={{
          py:6,
          px:6,
        }}
      >
        {filteredResults ? filteredRequestedItems : allRequestedItems}
      </Grid>
    </div>
  );
}

export default RequestedItemGrid;
