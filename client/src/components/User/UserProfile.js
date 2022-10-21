import React from "react";

const UserProfile = () => {
    const cardSlider = React.useRef();

    return (
        <main className="user-profile-container">
            <div className="user-info-container">
                {/* <img className="user-image" alt="user" src="../../images/user-image.jpeg" /> */}
                <div className="user-image-container">
                    <img className="user-image" alt="user" src={require("../../images/user-image.jpeg")}/>
                </div>
                <div className="user-info">
                    <h1 className="username">Username</h1>
                    <p className="location">City, Country</p>
                </div>
            </div>
            <div className="user-items-container">
                <h2>My Items</h2>
                <div className="user-borrowed-items">
                    <h3>I have borrowed</h3>
                    <div className="card-slider" ref={cardSlider}>
                        <div className="slider-item">1</div>
                        <div className="slider-item">2</div>
                        <div className="slider-item">3</div>
                    </div>
                </div>
                <div className="user-lent-items">
                    <h3>I have lent</h3>
                    <div className="card-slider" ref={cardSlider}>
                        <div className="slider-item">1</div>
                        <div className="slider-item">2</div>
                        {/* <div className="slider-item">3</div> */}
                    </div>
                </div>
            </div>

        </main>
    )
}

export default UserProfile;