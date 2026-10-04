const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Load college data
const collegeDataPath = path.join(__dirname, "College.json");

let collegeData = {};

try {
    collegeData = JSON.parse(
        fs.readFileSync(collegeDataPath, "utf8")
    );

    console.log("College data loaded successfully!");
} catch (error) {
    console.error("College.json could not be loaded:", error.message);
}

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

        const collegeContext = JSON.stringify(
            collegeData,
            null,
            2
        );

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-oss-20b",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are KINGS AI, the official AI assistant for KINGS College of Engineering, Punalkulam, Pudukkottai, Tamil Nadu.\n\n" +

                            "Answer college-related questions using the college database provided below.\n\n" +

                            "COLLEGE DATABASE:\n" +
                            collegeContext +
                            "\n\n" +

                            "IMPORTANT RULES:\n" +
                            "1. Use the college database whenever possible.\n" +
                            "2. Do not invent or guess college information.\n" +
                            "3. If the requested information is not available in the database, clearly say that it is not currently available in the college database.\n" +
                            "4. Give short, clear and helpful answers.\n" +
                            "5. If the user asks about courses, list the relevant courses clearly."
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
                    "HTTP-Referer": "https://msyednasrudeen.github.io/College-AI-Chatbot/",
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
    console.log(
        `KINGS AI Backend running on port ${PORT}`
    );
});
