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
        name: data.itemName ? data.itemName : null,
        city: data.city ? data.city : null,
        category: data.category ? data.category : null,
      },
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/offereditems/search`,config);
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
      <OfferedItemCard
        key={item._id}
        id={item._id}
        itemName={item.itemName}
        itemImages={item.itemImages}
        city={item.city}
        setShowSignUpPrompt={setShowSignUpPrompt}
      />
    );
  });

  const filteredOfferedItems = offeredItems.map((item) => {
    return (
      <OfferedItemCard
        key={item._id}
        id={item._id}
        itemName={item.itemName}
        itemImages={item.itemImages}
        city={item.city}
        setShowSignUpPrompt={setShowSignUpPrompt}
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
      <div className="offered-items-grid">
        {filteredResults ? filteredOfferedItems : allOfferedItems}
      </div>
    </div>
  );
}

export default OfferedItemGrid;
