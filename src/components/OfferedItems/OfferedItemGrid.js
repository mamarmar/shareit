import React from "react";
import axios from "axios";
//Components
import OfferedItemCard from "./OfferedItemCard";
import FiltersBar from "../FiltersBar";
import SignUpPrompt from "./SignUpPrompt";
//React Router
import { useLocation } from "react-router-dom";
//MUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function OfferedItemGrid({ offeredItems, setOfferedItems }) {
  const [showSignUpPrompt, setShowSignUpPrompt] = React.useState(false);
  const [showFilterBar, setShowFilterBar] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [filteredResults, setFilteredResults] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    filterItems();
  });

  function toggleFilterBar() {
    setShowFilterBar((prevValue) => !prevValue);
  }

  //Get filtered offered items when form is submitted
  async function filterItems(data) {
    let config = {
      params: {
        itemName: data.itemName ? data.itemName : null,
        city: data.city ? data.city : null,
        category: data.category ? data.category : null,
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/offereditems/search`,
        config
      );
      setShowAlert(false);
      if (res.data.data.length === 0) {
        setShowAlert(true);
      } else {
        setOfferedItems(res.data.data);
        setFilteredResults(true);
      }
    } catch (err) {
      console.log({ error: err });
    }
  }

  //Map over the incoming data and create an OfferedItemCard for every document
  const allOfferedItems = location.state.map((item) => {
    return (
      <Grid item xs={2}>
        <OfferedItemCard
          key={item._id}
          id={item._id}
          itemName={item.itemName}
          itemImages={item.itemImages}
          city={item.city}
          setShowSignUpPrompt={setShowSignUpPrompt}
        />
      </Grid>
    );
  });

  const filteredOfferedItems = offeredItems.map((item) => {
    return (
      <Grid item xs={2}>
        <OfferedItemCard
          key={item._id}
          id={item._id}
          itemName={item.itemName}
          itemImages={item.itemImages}
          city={item.city}
          setShowSignUpPrompt={setShowSignUpPrompt}
          // setOpen={setOpen}
        />
      </Grid>
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
          display: { xs: "none", md: "inline" },
          position: "fixed",
          right: 0,
          top: 170,
          minHeight: "fit-content",
          bgcolor: "grey.200",
          color: "grey.500",
          fontSize: "20px",
          p: 1.1,
          borderRadius: 1,
          writingMode: "vertical-rl",
          letterSpacing: 5,
        }}
      >
        OFFERED ITEMS{" "}
      </Typography>
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
              textAlign: "center",
            }}
          >
            There are no results matching your search. Please modify your
            filters.
          </Typography>
        )}
      </Stack>

      {showSignUpPrompt && (
        <SignUpPrompt setShowSignUpPrompt={setShowSignUpPrompt} />
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        columns={{ xs: 3, sm: 6, md: 9 }}
        justifyContent="center"
        sx={{
          py: 6,
          px: 6,
        }}
      >
        {filteredResults ? filteredOfferedItems : allOfferedItems}
      </Grid>
    </div>
  );
}

export default OfferedItemGrid;
