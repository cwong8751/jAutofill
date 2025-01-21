window.onload = () => {
    console.log("Window loaded!");
    const button = document.createElement("button");
    button.textContent = "autofill";
    button.onclick = () => console.log("Button clicked!");

    // Apply styles to position the button
    button.style.position = "fixed";  // Fixed to the viewport
    button.style.top = "10px";        // 10px from the top
    button.style.left = "10px";       // 10px from the left
    button.style.zIndex = "1000";     // Ensure the button is on top of other elements
    button.style.padding = "10px 20px";  // Some padding for the button
    button.style.fontSize = "16px";   // Optional: Increase font size
    button.style.cursor = "pointer";  // Change cursor on hover

    // Append the button to the body
    document.body.appendChild(button);

    
};
