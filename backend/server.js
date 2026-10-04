const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const WEBSITE = "https://www.kingsengg.edu.in/";

async function getCollegeWebsiteData() {
    try {
        const response = await axios.get(WEBSITE, {
            timeout: 10000,
            headers: {
                "User-Agent": "KINGS-AI-College-Chatbot"
            }
        });

        const $ = cheerio.load(response.data);

        $("script, style, noscript").remove();

        const text = $("body")
            .text()
            .replace(/\s+/g, " ")
            .trim();

        return text;

    } catch (error) {
        console.error(
            "Website fetch error:",
            error.message
        );

        return "";
    }
}

app.get("/", (req, res) => {
    res.json({
        message: "KINGS AI Backend is running!"
    });
});

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

        const websiteData = await getCollegeWebsiteData();

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-oss-20b",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are KINGS AI, the AI assistant for KINGS College of Engineering, Punalkulam, Pudukkottai, Tamil Nadu.\n\n" +

                            "Use the official college website information provided below to answer the user's question.\n\n" +

                            "OFFICIAL WEBSITE INFORMATION:\n" +
                            websiteData +
                            "\n\n" +

                            "RULES:\n" +
                            "1. Prefer the official website information.\n" +
                            "2. Do not invent college information.\n" +
                            "3. If the website information does not contain the answer, say that the information is not currently available.\n" +
                            "4. Give simple and clear answers.\n" +
                            "5. For courses, departments, admissions, contact information and facilities, use the available official information."
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
                    "HTTP-Referer":
                        "https://msyednasrudeen.github.io/College-AI-Chatbot/",
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
            "Chat error:",
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
