import React from "react";
import { PrimaryButton } from "../GlobalStyles";
import ajaxLoader from "../../images/ajax-loader.gif";

function Button({ type, value, onClick, loading }) {
  return (
    <div>
      <PrimaryButton type={type} onClick={onClick} className="btn btn-primary">
        {loading ? <img src={ajaxLoader} alt="loader" /> : value}
      </PrimaryButton>
    </div>
  );
}

export default Button;
