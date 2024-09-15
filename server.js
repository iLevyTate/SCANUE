import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import SCAN from './main.js';
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

const scan = new SCAN();

app.post('/analyze', async (req, res) => {
  const { inputText } = req.body;

  try {
    const result = await scan.processInput(inputText);
    res.json({ response: result });
  } catch (error) {
    console.error('Error in /analyze:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, async () => {
  try {
    await scan.initialize();
    console.log(`Server running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error initializing SCAN:', error);
    process.exit(1);
  }
});