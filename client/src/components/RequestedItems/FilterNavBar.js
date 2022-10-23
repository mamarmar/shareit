import React from "react";
import axios from "axios";

function FilterNavBar({ requestedItems, setRequestedItems}) {
    const [filter, setFilter] = React.useState({
        itemName:"",
        city:"",
        category:""
    });

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
            console.log(res);
        } catch(err) {
            console.log({error: err});
        }
    }

    return (
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
        </div>
    )
}

export default FilterNavBar;