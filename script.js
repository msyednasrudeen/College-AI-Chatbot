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

    if (!message) {
        return;
    }

    addMessage(message, "user");

    userInput.value = "";

    sendButton.disabled = true;

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

        // Remove Thinking message
        const messages = chatBox.querySelectorAll(".bot-message");
        const lastBotMessage = messages[messages.length - 1];

        if (lastBotMessage &&
            lastBotMessage.textContent === "Thinking... 🤖") {

            lastBotMessage.remove();
        }

        if (data.reply) {

            addMessage(data.reply, "bot");

        } else if (data.error) {

            addMessage(
                "Sorry 😕 " + data.error,
                "bot"
            );

        } else {

            addMessage(
                "Sorry, I couldn't understand the response.",
                "bot"
            );
        }

    } catch (error) {

        console.error(error);

        const messages = chatBox.querySelectorAll(".bot-message");
        const lastBotMessage = messages[messages.length - 1];

        if (lastBotMessage &&
            lastBotMessage.textContent === "Thinking... 🤖") {

            lastBotMessage.remove();
        }

        addMessage(
            "Server connection problem 😕 Please try again.",
            "bot"
        );
    }

    sendButton.disabled = false;

    userInput.focus();
}


sendButton.addEventListener("click", sendMessage);


userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});
