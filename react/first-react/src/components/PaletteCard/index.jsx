import React from "react";
import "./style.css";

export default function PaletteCard({ from, to }) {
    return (
        <div className="palette">
            <div
                className="palette-gradient"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
            ></div>
            <p className="palette-caption">
                {from} - {to}
            </p>
        </div>
    );
}
