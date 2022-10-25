import React from "react";
import axios from "axios";
//Components
import RequestedItemCard from "../RequestedItems/RequestedItemCard";
// import OfferedItemCard from "../OfferedItems/OfferedItemCard";
//React Router
import { useLocation } from "react-router-dom";

const UserProfile = () => {
    // const [borrowedItems, setBorrowedItems]=React.useState([]);
    const location = useLocation();

    const user = location.state;

    // React.useEffect(() => {
    //     getBorrowedItems();
    // },[]);
    // console.log(user.itemsBorrowed[0]);

    // function getBorrowedItems() {
    //     const token = localStorage.getItem("shareItToken");
    //     let config = {
    //         headers: { "x-access-token": token },
    //     };
    //     try {
    //         user.itemsBorrowed.map(async (item) => {
    //             const borrowedItem = await axios.get(`http://localhost:5000/requesteditems/${item}`,config);
    //             setBorrowedItems(prevItems => {
    //                 return [
    //                     ...prevItems,
    //                     borrowedItem
    //                 ]
    //             })
    //         })
    //     }catch(err) {
    //         console.log(err);
    //     }
    // }

    const cardSlider = React.useRef();

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
                    <h3>I have borrowed</h3>
                    <div className="card-slider" ref={cardSlider}>
                    {user.itemsBorrowed.map(item=> {
                            return <RequestedItemCard 
                                        className="slider-item"
                                        key={item._id}
                                        id={item._id}
                                        itemName={item.itemName}
                                        itemImages={item.itemImages}
                                    />
                        })}
                    </div>
                </div>
                : ""}
                {/* Conditionally render lent items section */}
                {user.itemsLent.length ?
                <div className="user-lent-items">
                    <h3>I have lent</h3>
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