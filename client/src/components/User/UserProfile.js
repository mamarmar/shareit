import React from "react";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
    const location = useLocation();

    const user = location.state;

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
                            return <div className="slider-item">Item Card</div>
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