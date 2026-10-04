const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

// KINGS AI Backend
const API_URL = "https://kings-college-ai.onrender.com/chat";

// Add message to chat
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

// Send message to AI
async function sendMessage() {
    const message = userInput.value.trim();

    if (!message) {
        return;
    }

    // Show user message
    addMessage(message, "user");

    // Clear input
    userInput.value = "";

    // Show loading message
    addMessage("Thinking... 🤖", "bot");

    const botMessages = document.querySelectorAll(".bot-message");
    const lastBotMessage = botMessages[botMessages.length - 1];

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (response.ok && data.reply) {
            lastBotMessage.textContent = data.reply;
        } else {
            lastBotMessage.textContent =
                data.error || "Sorry, I couldn't get a response.";
        }

    } catch (error) {
        console.error("Connection Error:", error);

        lastBotMessage.textContent =
            "Unable to connect to KINGS AI server. Please try again.";
    }
}

// Send button
sendButton.addEventListener("click", sendMessage);

// Press Enter to send
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
