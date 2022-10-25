import axios from "axios";
import React from "react";
//React Router
import { useLocation, Link } from "react-router-dom";

const OfferedItemPage = () => {
    const location = useLocation();
    const offeredItem = location.state;

    React.useEffect(() => {
        visitLenderProfile();
    });

    //Go to user profile
    async function visitLenderProfile() {
        const token = localStorage.getItem("shareItToken");
        let config = {
        headers: { "x-access-token": token },
        };
        try {
        await axios.get(
            `http://localhost:5000/user/${offeredItem.offeredBy._id}`,config);
        } catch (err) {
        console.log({ error: err });
        }
    }

    return (
        <main className="offered-item-container">
            <div className="images-container">
                <div className="main-image-container">
                    <img alt="table" src={require("../../images/table-image.jpeg")}/>
                </div>
                <div className="image-slider">
                    <div>
                        <img className="image-item" alt="table" src={require("../../images/table-image.jpeg")}/>
                    </div>
                    <div className="image-item">
                        <img className="image-item" alt="table" src={require("../../images/table-image.jpeg")}/>
                    </div>
                    <div className="image-item">
                        <img className="image-item" alt="table" src={require("../../images/table-image.jpeg")}/>
                    </div>
                </div>
            </div>
            <div className="offered-item-info-container">
                <h1>{offeredItem.itemName}</h1>
                <div className="offered-item-info">
                    <div className="description-container">
                        <h2>Description</h2>
                        <div className="description">
                            <p>{offeredItem.description}</p>
                        </div>
                    </div>
                    <div className="additional-info-container">
                        <div className="titles">
                            <p>Condition</p>
                            <p>Category</p>
                        </div>
                        <div className="values">
                            <p>{offeredItem.condition}</p>
                            <p>{offeredItem.category}</p>
                        </div>
                    </div>
                    <div className="lender-container">
                        <h3>Offered by</h3>
                        <div className="lender-info">
                            <div>
                            <Link
                                    to={`/user/${offeredItem.offeredBy._id}`}
                                    state={offeredItem.offeredBy}
                                    style={{ textDecoration: "none", color: "black" }}
                                    onClick={visitLenderProfile}
                                >
                                    <img className="user-image" alt="borrower" src={require("../../images/user-image.jpeg")}/>
                                </Link>
                            </div>
                            <p>{offeredItem.offeredBy.firstName}</p>
                        </div>
                    </div>
                </div>
                <button>Request Item</button>
            </div>
        </main>
    )
}

export default OfferedItemPage;