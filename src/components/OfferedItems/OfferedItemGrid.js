import React from "react";
import axios from "axios";
//Components
import OfferedItemCard from "./OfferedItemCard";
import SignUpPrompt from "./SignUpPrompt";
//React Router
import { useLocation } from "react-router-dom";

function OfferedItemGrid({ offeredItems, setOfferedItems }) {
  const [showSignUpPrompt, setShowSignUpPrompt] = React.useState(false);
  const [filter, setFilter] = React.useState({
    itemName: "",
    city: "",
    category: "",
  });
  const [filteredResults, setFilteredResults] = React.useState(false);

  const location = useLocation();
  console.log({ locationState: location.state });

  //Handle change of multiple inputs
  function handleChange(e) {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        [e.target.name]: e.target.value,
      };
    });
  }

  //Get filtered offered items when form is submitted
  async function handleSubmit(e) {
    e.preventDefault();
    let config = {
      params: {
        name: filter.itemName ? filter.itemName : null,
        city: filter.city ? filter.city : null,
        category: filter.category ? filter.category : null,
      },
    };
    try {
      const res = await axios.get(
        `http://localhost:5000/offereditems/search`,
        config
      );
      if (res.data.data.length === 0) {
        alert(
          "There are no results matching your search. Please modify your filters and try again."
        );
      } else {
        setOfferedItems(res.data.data);
        setFilteredResults(true);
      }
    } catch (err) {
      console.log({ error: err });
    }
  }

  function clearFilters() {
    setFilteredResults(false);
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
      <div className="filter-nav">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Which item?"
            id="itemName"
            name="itemName"
            value={filter.itemName}
            onChange={handleChange}
          />
          <input
            placeholder="City"
            id="city"
            name="city"
            value={filter.city}
            onChange={handleChange}
          />
          <input
            placeholder="Category"
            id="category"
            name="category"
            value={filter.category}
            onChange={handleChange}
          />
          <button>Search</button>
        </form>
        <button onClick={clearFilters}> Clear filters</button>
      </div>
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
