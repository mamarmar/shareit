import React from "react";
import axios from "axios";
//Decode JWT
import decode from "jwt-decode";
//EmailJS
import { send } from "emailjs-com";

function PopUp({ setShowPopUp, offeredItem }) {
  const [toSend, setToSend] = React.useState({
    from_name: "",
    to_name: "",
    message: "",
    to_email: "",
    offeredItem: "",
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
      const lender = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${offeredItem.offeredBy._id}`,
        config
      );
      const currentUser = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${decodedToken.user_id}`,
        config
      );
      setToSend((prevToSend) => {
        return {
          ...prevToSend,
          from_name: currentUser.data.firstName,
          to_name: lender.data.firstName,
          to_email: lender.data.email,
          offeredItem: offeredItem.itemName,
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
        "template_zuyolh9",
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
        Request item from {offeredItem.offeredBy.firstName}
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
