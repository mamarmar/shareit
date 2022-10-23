import React from "react";
import axios from "axios"
//Components
import RequestedItemCard from "./RequestedItemCard";
//React Router
import { useLocation } from "react-router-dom";

function RequestedItemGrid({ requestedItems, setRequestedItems }) {
    const [filter, setFilter] = React.useState({
        itemName:"",
        city:"",
        category:""
    });

    const [filteredResults, setFilteredResults] = React.useState(false);

    const location = useLocation();

    React.useEffect(() => {
        handleSubmit();
    })

    //Handle change of multiple inputs
    function handleChange(e) {
        setFilter((prevFilter) => {
        return {
            ...prevFilter,
            [e.target.name]: e.target.value,
        };
        });
    }

    //Get filtered requested items when form is submitted
    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("shareItToken");
        let config = {
            params: {
                name: filter.itemName ? filter.itemName : null,
                city: filter.city ? filter.city : null,
                category:filter.category ? filter.category : null
            },
            headers: { "x-access-token": token },
        };
        try {
            const res = await axios.get(`http://localhost:5000/requesteditems/search`, config);
            if (res.data.data.length === 0) {
                console.log("There are no results matching your search. Please modify your filters and try again.")
            } else {
                setRequestedItems(res.data.data);
                setFilteredResults(true);
            }
        } catch(err) {
            console.log({error: err});
        }
    }

    function clearFilters() {
        setFilteredResults(false);
    }

    //Map over the incoming data and create a RequestedItemCard for every document
    const allRequestedItems = location.state.map(item => {
        return (
            <RequestedItemCard 
                key={item._id}
                itemName={item.itemName}
                itemImages={item.itemImages}
            />
        )
    })

    const filteredRequestedItems = requestedItems.map(item => {
        return (
            <RequestedItemCard 
                key={item._id}
                itemName={item.itemName}
                itemImages={item.itemImages}
            />
        )
    })

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
            <button
                onClick={clearFilters}
            >   Clear filters
            </button>
        </div>
            <div className="offered-items-grid">
            {filteredResults ? filteredRequestedItems : allRequestedItems}
            </div>
        </div>
        
    )
}

export default RequestedItemGrid;