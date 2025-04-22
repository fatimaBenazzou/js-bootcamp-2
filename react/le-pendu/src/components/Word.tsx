export default function Word({
    wordToGuess,
    guessedLetters,
    reveal,
}: {
    wordToGuess: string;
    guessedLetters: string[];
    reveal: boolean;
}) {
    return (
        <section
            style={{
                display: "flex",
                gap: ".25em",
                fontSize: "6rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "monospace",
            }}
        >
            {wordToGuess.split("").map((letter, index) => (
                <span style={{ borderBottom: ".1em solid black" }} key={index}>
                    <span
                        style={{
                            visibility:
                                guessedLetters.includes(letter) || reveal ? "visible" : "hidden",
                            color: !guessedLetters.includes(letter) && reveal ? "red" : "black",
                        }}
                    >
                        {letter}
                    </span>
                </span>
            ))}
        </section>
    );
}
