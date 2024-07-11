import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createAssistants } from './pfc.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let assistants;

app.post('/analyze', async (req, res) => {
  const { inputText } = req.body;

  try {
    if (!assistants) {
      assistants = await createAssistants();
    }
    const synthesizedResponse = await assistants.ACC.analyze(inputText);
    res.json({ response: synthesizedResponse });
  } catch (error) {
    console.error('Error in /analyze:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, async () => {
  try {
    assistants = await createAssistants();
    console.log(`Server running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error initializing assistants:', error);
    process.exit(1);
  }
});
