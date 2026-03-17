const express = require("express")
const cors = require("cors")
const axios = require("axios")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

function countTokens(text) {
    return text.split(/\s+/).length
}

async function smartPrune(text) {
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            contents: [
                {
                    parts: [
                        {
                            text: `Extract only critical medical information from this emergency description. Keep it short and structured:\n${text}`
                        }
                    ]
                }
            ]
        }
    )
    return response.data.candidates[0].content.parts[0].text
}

app.post("/analyze", async (req, res) => {
    const { input } = req.body

    const start = Date.now()

    try {
        const pruned = await smartPrune(input)

        const beforeTokens = countTokens(input)
        const afterTokens = countTokens(pruned)

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a medical emergency triage assistant.

Based on the input, respond strictly in this format:

Severity: (Critical / Moderate / Low)
Reason: (short explanation)
Action: (what should be done immediately)

Input:
${pruned}`
                            }
                        ]
                    }
                ]
            }
        )

        const result = response.data.candidates[0].content.parts[0].text

        const end = Date.now()

        res.json({
            result,
            beforeTokens,
            afterTokens,
            reduction: ((beforeTokens - afterTokens) / beforeTokens * 100).toFixed(2),
            latency: end - start,
            pruned
        })

    } catch (err) {
        res.status(500).json({ error: "Gemini API Error" })
    }
})

app.listen(process.env.PORT, () => console.log("Server running on port 5000"))