const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

const API_URL = "https://kings-college-ai.onrender.com/chat";

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

async function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user");
    userInput.value = "";

    addMessage("Thinking... 🤖", "bot");

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

        const messages = document.querySelectorAll(".bot-message");
        const lastMessage = messages[messages.length - 1];

        if (data.reply) {
            lastMessage.textContent = data.reply;
        } else {
            lastMessage.textContent = "Sorry, something went wrong.";
        }

    } catch (error) {
        console.error(error);

        const messages = document.querySelectorAll(".bot-message");
        const lastMessage = messages[messages.length - 1];

        lastMessage.textContent =
            "Unable to connect to AI server. Please try again.";
    }
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
