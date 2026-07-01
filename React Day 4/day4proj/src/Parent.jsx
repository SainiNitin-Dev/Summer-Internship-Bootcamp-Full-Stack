import React from "react";
import Child from "./Child";

const Parent = () => {
    const name = "React Day 4";
    
    return (
        <div>
            <h1>Parent Component</h1>
            <Child property={name} />
        </div>
    );
}