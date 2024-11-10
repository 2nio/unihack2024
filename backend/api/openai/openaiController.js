const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OpenAiKey,
});

const postOpenAi = async (req, res) => {
    try {
        const result = await openai.chat.completions.create({
            model: "gpt-4o-mini",

            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    max_token: 400,
                    content: `
                ${req.body.lesson}

                Based on the text above, create a training test with 6 questions. Respond only with text that has the following parsable JSON format:
    {
        "Q": question",
        "A": "answer"
    }   
        `,
                },
            ],
        })
        const parseJSON = JSON.parse(result.choices[0].message.content);
        res.status(200).json(parseJSON)
    } catch (error) {
        res.status(400).json(error)
    }
};

module.exports = { postOpenAi }