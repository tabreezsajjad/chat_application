const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function () {
    console.log("connected to the server");
};

ws.onmessage = function (event) {
    const messages = document.querySelector(".messages");
    const message = document.createElement("div");
    message.classList.add("message", "received");

    // Convert Blob to string if necessary
    if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function() {
            message.textContent = reader.result;
            messages.appendChild(message);
            messages.scrollTop = messages.scrollHeight; // Scroll to bottom
        };
        reader.readAsText(event.data);
    } else {
        message.textContent = event.data;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight; // Scroll to bottom
    }
};

ws.onclose = function () {
    console.log("Disconnected from the server");
};

const form = document.querySelector(".message_form");
const input = document.querySelector(".message_input");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const message = input.value;
    if (message.trim()) { // Ensure the message is not just whitespace
        // Display your own message in the chat
        const messages = document.querySelector(".messages");
        const myMessage = document.createElement("div");
        myMessage.classList.add("message", "sent");
        myMessage.textContent = `Me: ${message}`;
        messages.appendChild(myMessage);
        messages.scrollTop = messages.scrollHeight; // Scroll to bottom

        // Send the message to the server
        ws.send(message);
        input.value = '';
    }
});
