import React from "react";
// import axios from "axios"
import RequestedItemCard from "./RequestedItemCard";
import { useLocation } from "react-router-dom";

function RequestedItemGrid() {
    const location = useLocation()

    //Map over the incoming data and create an RequestedItemCard for every document
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
        <div className="offered-items-grid">
            {allRequestedItems}
        </div>
    )
}

export default RequestedItemGrid;