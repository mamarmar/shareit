import React from "react";
import axios from "axios";
//React Router
import { useNavigate } from "react-router-dom";

function DeletePopUp({ setShowDeletePopUp, offeredItem, currentUserId }) {
    const navigate = useNavigate();

    function closeDeletePopUp() {
    setShowDeletePopUp(false);
    }

    //Delete item - only if the current user is the one who created the listing
    async function deleteItem() {
        const token = localStorage.getItem("shareItToken");
        let config = {
        headers: { "x-access-token": token },
        };
        try {
            const res = await axios.delete(`http://localhost:5000/offereditems/${offeredItem._id}`,config);
            console.log(res);
            navigate("/offered/new");
            window.location.reload();
        } catch (err) {
            console.log({ error: err });
        }
    }

  return (
    <div className="delete-pop-up">
      <h1>
        Are you sure you want to delete this item?
      </h1>
      <div className="button-container">
        <button 
            className="delete-button"
            onClick={deleteItem}
        >
            Delete
        </button>
        <button 
            className="cancel-button"
            onClick={closeDeletePopUp}
        >
            Cancel
        </button>
      </div>
    </div>
  );
}

export default DeletePopUp;
