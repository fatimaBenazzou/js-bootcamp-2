// import Header from "./components/Header";
// import MyComponent from "./components/MyComponent";

import PaletteCard from "./components/PaletteCard";
import "./app.css";
import { useState } from "react";
import Counter from "./components/Counter";
const palettes = [
    {
        from: "#f40076",
        to: "#df98fa",
    },
    {
        from: "#f06966",
        to: "#fad6a6",
    },
    {
        from: "#ff0076",
        to: "#590fb7",
    },
    {
        from: "#9055ff",
        to: "#13e2da",
    },
    {
        from: "#0b63f6",
        to: "#003cc5",
    },
    {
        from: "#d6ff7f",
        to: "#00b3cc",
    },
    {
        from: "#e233ff",
        to: "#ff6b00",
    },
    {
        from: "#df98fa",
        to: "#9055ff",
    },
    {
        from: "#ed7b84",
        to: "#9055ff",
    },
    {
        from: "#402565",
        to: "#30be96",
    },
    {
        from: "#402662",
        to: "#3900a6",
    },
    {
        from: "#f14658",
        to: "#dc2537",
    },
    {
        from: "#f40076",
        to: "#342711",
    },
    {
        from: "#000066",
        to: "#6699ff",
    },
    {
        from: "#cb5eee",
        to: "#4be1ec",
    },
    {
        from: "#fa7cbb",
        to: "#f14658",
    },
    {
        from: "#737dfe",
        to: "#ffcac9",
    },
    {
        from: "#2f80ed",
        to: "#b2ffda",
    },
];

function App() {
    // const name = "Fatima";
    // const message = "Hello";

    // const componentProps = {
    //     name: "Yakine",
    //     message: "Hellooooo",
    // };
    const [selectedColor, setSelectedColor] = useState(null);

    return (
        <>
            <Counter />
            <div
                className="selected"
                style={selectedColor ? { background: selectedColor } : undefined}
            ></div>
            <h1>Color Palettes</h1>
            <div className="palettes-grid">
                {palettes.map((palette, i) => (
                    <PaletteCard
                        onClick={() => {
                            setSelectedColor(
                                `linear-gradient(135deg, ${palette.from}, ${palette.to})`
                            );
                        }}
                        key={"color" + i}
                        from={palette.from}
                        to={palette.to}
                    />
                ))}
            </div>
            {/* <Header />
            <main>
                <h1>Hello world !</h1>
                <MyComponent name={name} message={message} />
                <MyComponent name={componentProps.name} message={componentProps.message} />
            </main> */}
        </>
    );
}

export default App;
