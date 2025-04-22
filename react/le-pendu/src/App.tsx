import { useCallback, useEffect, useState } from "react";
import Drawing from "./components/Drawing";
import Keyboard from "./components/Keyboard";
import words from "./wordList.json";
import Word from "./components/Word";
function getWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>(getWord);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));
    const correctLetters = guessedLetters.filter((letter) => wordToGuess.includes(letter));

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess.split("").every((letter) => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isLoser || isWinner) return;

            setGuessedLetters((currentLetters) => [...currentLetters, letter]);
        },
        [guessedLetters, isWinner, isLoser]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;
            if (!key.match(/^[a-z]$/)) return;

            e.preventDefault();
            addGuessedLetter(key);
        };

        document.addEventListener("keypress", handler);

        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, [guessedLetters]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;
            if (key !== "Enter") return;

            e.preventDefault();
            setGuessedLetters([]);
            setWordToGuess(getWord());
        };

        document.addEventListener("keypress", handler);

        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, []);

    return (
        <main
            style={{
                maxWidth: "800px",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                margin: "0 auto",
                alignItems: "center",
            }}
        >
            {/* message */}
            <div style={{ fontSize: "2rem", textAlign: "center" }}>
                {isWinner && "Winner! - Refresh to try again"}
                {isLoser && "Nice Try - Refresh to try again"}
            </div>

            {/* Drawing */}
            <Drawing numberOfGuesses={incorrectLetters.length} />
            {/* Word */}
            <Word reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
            {/* keyboard */}
            <div style={{ alignSelf: "stretch" }}>
                <Keyboard
                    activeLetters={correctLetters}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter}
                    disabled={isWinner || isLoser}
                />
            </div>
        </main>
    );
}

export default App;
