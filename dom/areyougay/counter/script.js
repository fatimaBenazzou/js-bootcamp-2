// Wait for the entire page content to load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    const counterElement = document.getElementById("counter");
    const incrementButton = document.getElementById("increment");
    const decrementButton = document.getElementById("decrement");
    const resetButton = document.getElementById("reset");

    let counterValue = 0;

    function updateCounter() {
        counterElement.textContent = counterValue;

        if (counterValue > 0) {
            counterElement.className = "positive";
        } else if (counterValue < 0) {
            counterElement.className = "negative";
        } else {
            counterElement.className = "neutral";
        }
    }

    incrementButton.addEventListener("click", () => {
        counterValue++;
        updateCounter();
    });
    decrementButton.addEventListener("click", () => {
        counterValue--;
        updateCounter();
    });
    resetButton.addEventListener("click", () => {
        counterValue = 0;
        updateCounter();
    });
});
