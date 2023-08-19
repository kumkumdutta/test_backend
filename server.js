const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.post('/ask', async (req, res) => {
  try {
    const keyword = req.body.keyword;
    const category = req.body.category
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `generate ${category} about ${keyword}`,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.choices[0].text.trim();
    res.json({ content });
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
