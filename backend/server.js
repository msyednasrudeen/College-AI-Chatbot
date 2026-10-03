const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

// Gemini AI
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Kings College AI Backend is running!"
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

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: userMessage,
            config: {
                systemInstruction:
                    "You are Kings College of Engineering AI Assistant. " +
                    "Help students with college-related questions. " +
                    "Be polite, clear and helpful. " +
                    "Do not invent college information when you do not know it."
            }
        });

        res.json({
            reply: response.text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "AI response failed"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
