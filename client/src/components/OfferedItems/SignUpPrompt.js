import React from "react";
//React Router
import { Link } from "react-router-dom";

function SignUpPrompt({ setShowSignUpPrompt }) {
   
function closePopUp() {
    setShowSignUpPrompt(false)
}

  return (
    <div className="sign-up-prompt">
        <p className="close-prompt"onClick={closePopUp}>x</p>
      <h1>
        Please &nbsp;
        <Link to="/signup">
        sign up
        </Link>
        &nbsp; to see item details.
      </h1>
    </div>
  );
}

export default SignUpPrompt;
