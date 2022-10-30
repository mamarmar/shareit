import axios from "axios";
import React from "react";
//Components
import PopUp from "./PopUp";
import DeletePopUp from "./DeletePopUp";
//React Router
import { useLocation, Link } from "react-router-dom";
//Decode JWT
import decode from "jwt-decode";

const OfferedItemPage = () => {
    const location = useLocation();
    const offeredItem = location.state;

    const [lender, setLender] = React.useState({});
    const [showPopUp, setShowPopUp] = React.useState(false);
    const [showDeletePopUp, setShowDeletePopUp] = React.useState(false);

    const lenderId = offeredItem.offeredBy._id;
    const currentUserId = decode(localStorage.getItem("shareItToken")).user_id;

    React.useEffect(() => {
        visitLenderProfile();
    });

    function openPopUp() {
        setShowPopUp(true)
    };

    function openDeletePopUp() {
        setShowDeletePopUp(true);
    };

    //Go to user profile
    async function visitLenderProfile() {
        const token = localStorage.getItem("shareItToken");
        let config = {
        headers: { "x-access-token": token },
        };
        try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${offeredItem.offeredBy._id}`,config);
        setLender(res.data);
        } catch (err) {
        console.log({ error: err });
        }
    }

    return (
        <main className="offered-item-container">
            {showPopUp && <PopUp setShowPopUp={setShowPopUp} offeredItem={offeredItem}/>}
            {showDeletePopUp && <DeletePopUp setShowDeletePopUp={setShowDeletePopUp} offeredItem={offeredItem} currentUserId={currentUserId}/>}
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
                                    state={lender}
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
                {lenderId === currentUserId ? 
                        <button
                            onClick={openDeletePopUp}
                        >
                            Delete Item
                        </button> :
                        <button
                        onClick={openPopUp}
                        >
                            Request Item
                        </button>
                        }
            </div>
        </main>
    )
}

export default OfferedItemPage;