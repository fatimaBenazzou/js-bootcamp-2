import React from "react";

export default function MyComponent({ name, message }) {
    return (
        <div>
            <h2>Hello, {name}!</h2>
            <p>{message}</p>
        </div>
    );
}
