import React from "react";
import Parent from "./Parent";

const Child = ({ property }) => {
  return (
    <div>
        <h1>Child Component</h1>
        <h1>{property}</h1>
    </div>
  );
}

export default Child;