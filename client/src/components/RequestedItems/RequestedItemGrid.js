import React from "react";
// import axios from "axios"
//Components
import FilterNavBar from "./FilterNavBar";
import RequestedItemCard from "./RequestedItemCard";
//React Router
import { useLocation } from "react-router-dom";

function RequestedItemGrid() {
    const location = useLocation();

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
    return (
        <div>
            <FilterNavBar requestedItems={location.state} setRequestedItems={location.setState}/>
            <div className="offered-items-grid">
            {allRequestedItems}
            </div>
        </div>
        
    )
}

export default RequestedItemGrid;