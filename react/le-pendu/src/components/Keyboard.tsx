import styles from "./Keyboard.module.css";

const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
export default function Keyboard({
    activeLetters,
    inactiveLetters,
    addGuessedLetter,
    disabled = false,
}: {
    activeLetters: string[];
    inactiveLetters: string[];
    addGuessedLetter: (letter: string) => void;
    disabled?: boolean;
}) {
    return (
        <section
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
                gap: ".5rem",
            }}
        >
            {KEYS.map((key) => {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);
                return (
                    <button
                        onClick={() => addGuessedLetter(key)}
                        className={`${styles.btn} ${isActive ? styles.active : ""} ${
                            isInactive ? styles.inactive : ""
                        }`}
                        disabled={disabled || isActive || isInactive}
                        key={key}
                    >
                        {key}
                    </button>
                );
            })}
        </section>
    );
}
