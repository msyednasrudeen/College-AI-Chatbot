const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// OpenRouter API
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "KINGS AI Backend is running!"
    });
});

// Chat route
app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        if (!OPENROUTER_API_KEY) {
            return res.status(500).json({
                error: "OpenRouter API key is not configured"
            });
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-oss-20b",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are KINGS AI, the AI Assistant for KINGS College of Engineering, Punalkulam, Pudukkottai, Tamil Nadu. " +
                            "Help students with college-related questions. " +
                            "Be polite, clear and helpful. " +
                            "Do not invent college information when you do not know it."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "KINGS AI College Chatbot"
                }
            }
        );

        const reply =
            response.data.choices[0].message.content;

        res.json({
            reply: reply
        });

    } catch (error) {

        console.error(
            "OpenRouter Error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            error: "AI response failed"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`KINGS AI Backend running on port ${PORT}`);
});
