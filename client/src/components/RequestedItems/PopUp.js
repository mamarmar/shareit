import React from "react";
import axios from "axios";
//Decode JWT
import decode from "jwt-decode";
//EmailJS
import { send } from "emailjs-com";

function PopUp({ setShowPopUp, requestedItem }) {
  const [toSend, setToSend] = React.useState({
    from_name: "",
    to_name: "",
    message: "",
    to_email: "",
    requestedItem: "",
    reply_to: "",
  });

  React.useEffect(() => {
    updateState();
  }, []);

  function handleChange(e) {
    setToSend((prevToSend) => {
      return {
        ...prevToSend,
        [e.target.name]: e.target.value,
      };
    });
  }
  //Update State
  async function updateState() {
    const token = localStorage.getItem("shareItToken");
    const decodedToken = decode(token);
    let config = {
      headers: { "x-access-token": token },
    };
    try {
      const borrower = await axios.get(
        `http://localhost:5000/user/${requestedItem.borrowedBy._id}`,
        config
      );
      const currentUser = await axios.get(
        `http://localhost:5000/user/${decodedToken.user_id}`,
        config
      );
      setToSend((prevToSend) => {
        return {
          ...prevToSend,
          from_name: currentUser.data.firstName,
          to_name: borrower.data.firstName,
          to_email: borrower.data.email,
          requestedItem: requestedItem.itemName,
          reply_to: currentUser.data.email,
        };
      });
    } catch (err) {
      console.log({
        Error: "Error when trying to update sender/receiver information",
      });
    }
  }

  //Send email when form is submitted
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      updateState();
      const res = await send(
        "service_t9haahr",
        "template_7g1qzln",
        toSend,
        "pNxISdWFiXKTiASCC"
      );
      console.log("SUCCESS!", res.status, res.text);
    } catch (err) {
      console.log({ Error: err });
    }
  }

  function closePopUp() {
    setShowPopUp(false);
  }

  return (
    <div className="pop-up">
      <p className="close-pop-up" onClick={closePopUp}>
        X
      </p>
      <h1>
        Offer your {requestedItem.itemName} to{" "}
        {requestedItem.borrowedBy.firstName}
      </h1>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="message"
          value={toSend.message}
          placeholder="Type your message"
          onChange={handleChange}
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default PopUp;
