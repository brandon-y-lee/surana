const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: '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' });

app.post('/generate-text', async (req, res) => {
    console.log('hiiii', req.body)
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      max_tokens: 50,
      temperature: 0.7,
    });

    const generatedText = response.choices[0].text;
    res.json({ generatedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
