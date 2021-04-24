import React from "react";

function Input({ label, type, value, ...rest }) {
  if (type === "checkbox")
    return (
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" />
        <label className="form-check-label" htmlFor="exampleCheck1">
          {label}
        </label>
      </div>
    );
  return (
    <div className="form-group">
      <label>{label}</label>
      <input {...rest} className="form-control" type={type} value={value || ""} />
    </div>
  );
}

export default Input;
