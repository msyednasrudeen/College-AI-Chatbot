const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

function addMessage(message, type) {
    const div = document.createElement("div");

    div.classList.add("message");

    if (type === "user") {
        div.classList.add("user-message");
    } else {
        div.classList.add("bot-message");
    }

    div.textContent = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") {
        return;
    }

    // Show user message
    addMessage(message, "user");

    // Clear input
    userInput.value = "";

    // Temporary bot response
    setTimeout(() => {

        addMessage(
            "Thanks for your question! 🤖 AI connection will be added soon.",
            "bot"
        );

    }, 500);
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});
