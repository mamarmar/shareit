import React from "react";
// import axios from "axios"
import OfferedItemCard from "./OfferedItemCard";
import { useLocation } from "react-router-dom";

function OfferedItemGrid() {
    const location = useLocation()

    //Map over the incoming data and create an OfferedItemCard for every document
    const allOfferedItems = location.state.map(item => {
        return (
            <OfferedItemCard 
                key={item._id}
                itemName={item.itemName}
                itemImages={item.itemImages}
            />
        )
    })
    return (
        <div className="offered-item-grid">
            {allOfferedItems}
        </div>
    )
}

export default OfferedItemGrid;