import React from "react";
import { PrimaryButton } from "../GlobalStyles";

function Button({ type, value, onClick }) {
  return (
    <div>
      <PrimaryButton type={type} onClick={onClick} className="btn btn-primary">
        {value}
      </PrimaryButton>
    </div>
  );
}

export default Button;
