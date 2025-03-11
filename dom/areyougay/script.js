// Wait for the entire page content to load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Select the button with the ID "No"
    const noButton = document.getElementById("No");
    // Add an event listener that runs when the mouse hovers over the "No" button
    noButton.addEventListener("mouseover", () => {
        // Calculate a random X position within the visible screen width
        // (make sure the button stays fully on-screen by subtracting its width)
        const randomX = Math.random() * (window.innerWidth - noButton.offsetWidth);
        // Calculate a random Y position within the visible screen height
        // (make sure the button stays fully on-screen by subtracting its height)
        const randomY = Math.random() * (window.innerHeight - noButton.offsetHeight);
        // Move the "No" button to the new random position using "fixed" positioning
        noButton.style.position = "fixed";
        noButton.style.left = randomX + "px";
        noButton.style.top = randomY + "px";
    });
    // Select the button with the ID "Yes"
    const yesButton = document.querySelector("#Yes");
    // Add an event listener that runs when the "Yes" button is clicked
    yesButton.addEventListener("click", () => {
        // Display a popup message saying "I knew it" when the "Yes" button is clicked
        alert("I knew it !!!!!!!!");
    });
});
