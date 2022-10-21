import { useParams } from "react-router-dom";

const OfferedItemPage = () => {
    const { id } = useParams();
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
                <h1>Table {id}</h1>
                <div className="offered-item-info">
                    <div className="description-container">
                        <h2>Description</h2>
                        <div className="description">
                            <p>Long wooden table</p>
                        </div>
                    </div>
                    <div className="additional-info-container">
                        <div className="titles">
                            <p>Condition</p>
                            <p>Category</p>
                        </div>
                        <div className="values">
                            <p>Like New</p>
                            <p>Furniture</p>
                        </div>
                    </div>
                    <div className="lender-container">
                        <h3>Offered by</h3>
                        <div className="lender-info">
                            <div>
                                <img className="user-image" alt="lender" src={require("../../images/user-image.jpeg")}/>
                            </div>
                            <p>Username</p>
                        </div>
                    </div>
                </div>
                <button>Request Item</button>
            </div>
        </main>
    )
}

export default OfferedItemPage;