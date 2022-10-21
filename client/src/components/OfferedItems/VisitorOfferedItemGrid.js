import React from "react";
// import axios from "axios"
import OfferedItemCard from "./OfferedItemCard";
//Context
import { OfferedItemContext } from "../../context/OfferedItemContext";

function VisitorOfferedItemGrid() {
    const { offeredItems } = React.useContext(OfferedItemContext);

    console.log(offeredItems);

    //Map over the incoming data and create an OfferedItemCard for every document
    const allOfferedItems = offeredItems.map(item => {
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

export default VisitorOfferedItemGrid;