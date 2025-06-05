import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI API route
app.post('/api/chat', async (req, res) => {
  console.log('Received chat request:', req.body);
  
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    console.log('API Key available:', !!apiKey);
    
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      return res.status(500).json({ error: 'OpenAI API key not configured on server' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return res.status(response.status).json({ 
        error: `OpenAI API error: ${response.status} ${response.statusText}` 
      });
    }

    const data = await response.json();
    console.log('OpenAI API response received successfully');
    
    const aiMessage = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    res.json({ message: aiMessage });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});