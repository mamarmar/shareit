import React from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const OfferedItemContext = React.createContext();

function OfferedItemsProvider({ children }) {
    // const navigate = useNavigate();

    const [offeredItems, setOfferedItems ] = React.useState([]);

    React.useEffect(() => {
        getOfferedItems()
    },[]);

    const getOfferedItems = async() => {
        try {
            const res = await axios.get(`http://localhost:5000/offereditems/visitor`);
            setOfferedItems(res.data.data);
            // navigate("/offered/visitor");
          } catch (err) {
            console.log("Could not fetch offered items");
            console.log(err);
          }
    };


    return (
        <OfferedItemContext.Provider value={{ offeredItems, getOfferedItems}}>
            {children}
        </OfferedItemContext.Provider>
    )
}

export default OfferedItemsProvider;
