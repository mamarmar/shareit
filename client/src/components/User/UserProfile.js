import React from "react";
import axios from "axios";
//Components
import RequestedItemCard from "../RequestedItems/RequestedItemCard";
// import OfferedItemCard from "../OfferedItems/OfferedItemCard";
//React Router
import { useLocation } from "react-router-dom";

const UserProfile = () => {
    const [requestedItems, setRequestedItems]=React.useState([]);
    const cardSlider = React.useRef();
    const location = useLocation();

    const user = location.state;
    console.log(user.itemsBorrowed);

    React.useEffect(() => {
        getRequestedItems();
    },[]);

    console.log({itemsBorrowed:user.itemsBorrowed});

    function getRequestedItems() {
        let requestedItemsArray=[];
        const token = localStorage.getItem("shareItToken");
        let config = {
            headers: { "x-access-token": token }
        };
        user.itemsBorrowed.map(async(id) => {
            try {
                const requestedItem = await axios.get(`http://localhost:5000/requesteditems/${id}`,config);
                // console.log(requestedItem.data.data[0]);
                // setRequestedItems(prevItems => {
                //     return [
                //         ...prevItems,
                //         requestedItem.data.data[0]
                //     ]
                // })
                requestedItemsArray.push(requestedItem.data.data[0]);
            }catch(err) {
                console.log({Error:err});
            }
        })
        setRequestedItems(requestedItemsArray);
    };

    

    return (
        <main className="user-profile-container">
            <div className="user-info-container">
                {/* <img className="user-image" alt="user" src="../../images/user-image.jpeg" /> */}
                <div className="user-image-container">
                    <img className="user-image" alt="user" src={require("../../images/user-image.jpeg")}/>
                </div>
                <div className="user-info">
                    <h1 className="username">{user.firstName}</h1>
                    <p className="location">{user.city}, {user.country}</p>
                </div>
            </div>
            <div className="user-items-container">
                <h2>My Items</h2>
                {/* Conditionally render borrowed items section */}
                {user.itemsBorrowed.length ? 
                <div className="user-borrowed-items">
                    <h3>I have requested</h3>
                    <div className="card-slider" ref={cardSlider}>
                    {requestedItems.map(item=> {
                            return <RequestedItemCard 
                                        className="slider-item"
                                        key={item._id}
                                        id={item._id}
                                        itemName={item.itemName}
                                        city={item.city}
                                        itemImages={item.itemImages}
                                    />
                        })}
                    </div>
                </div>
                : ""}
                {/* Conditionally render lent items section */}
                {user.itemsLent.length ?
                <div className="user-lent-items">
                    <h3>I am offering</h3>
                    <div className="card-slider" ref={cardSlider}>
                        {user.itemsLent.map(item=> {
                            return <div className="slider-item">Item Card</div>
                        })}
                    </div>
                </div>
                :""}
            </div>

        </main>
    )
}

export default UserProfile;