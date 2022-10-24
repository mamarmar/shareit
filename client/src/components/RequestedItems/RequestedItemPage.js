import React from "react";
import axios from "axios";
//React Router
import { Link, useLocation } from "react-router-dom";

const RequestedItemPage = () => {
    const location = useLocation();
    const requestedItem = location.state;
    console.log(requestedItem)
    // const fromDay = requestedItem.fromDate.getDate();
    // const fromMonth = (requestedItem.fromDate.getMonth()) + 1;
    // const fromYear = requestedItem.fromDate.getFullYear();
    // const fromDate = `${fromDay}/${fromMonth}/${fromYear}`;

    React.useEffect(() => {
        visitBorrowerProfile();
    },[])

    //Go to user profile
  async function visitBorrowerProfile() {
    const token = localStorage.getItem("shareItToken");
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const res = await axios.get(
        `http://localhost:5000/user/${requestedItem.borrowedBy._id}`,
        config
      );
      console.log(res.data);
    } catch (err) {
      console.log({ error: err });
    }
  }
    return (
        <main className="requested-item-container">
                    <div className="heading">
                        <h1>{requestedItem.itemName}</h1>
                        <button>Offer Item</button>
                    </div>
                    <div className="description-container">
                        <h2>Description</h2>
                        <div className="description">
                            <p>{requestedItem.description}</p>
                        </div>
                    </div>
                    <div className="dates-container">
                        <p>Dates:</p>
                        <p>{requestedItem.fromDate}-{requestedItem.toDate}</p>
                    </div>
                    <div className="borrower-container">
                        <h3>Requested by</h3>
                        <div className="borrower-info">
                            <div>
                                    <Link
                                    to={`/user/${requestedItem.borrowedBy._id}`}
                                    state={requestedItem.borrowedBy}
                                    style={{ textDecoration: "none", color: "black" }}
                                    onClick={visitBorrowerProfile}
                                >
                                    <img className="user-image" alt="borrower" src={require("../../images/user-image.jpeg")}/>
                                </Link>
                            </div>
                            <p>{requestedItem.borrowedBy.firstName}</p>
                        </div>
                    </div>
            
        </main>
    )
}

export default RequestedItemPage