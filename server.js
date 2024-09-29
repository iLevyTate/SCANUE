import express from 'express';
import path from 'path';
import { createAssistants } from './pfc.js';

// Define __dirname for ES module context
const __dirname = new URL('.', import.meta.url).pathname;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize assistants
let assistants;

(async () => {
  try {
    assistants = await createAssistants();
    console.log('Assistants initialized successfully.');
  } catch (error) {
    console.error('Error initializing assistants:', error);
  }
})();

// Route to analyze input text
app.post('/api/analyze', async (req, res) => {
    console.log('Received POST request to /api/analyze');
    console.log('Request body:', req.body);

    try {
        const { inputText, context } = req.body;
        if (!inputText) {
            console.log('Error: Input text is missing');
            return res.status(400).json({ error: 'Input text is required.' });
        }

        console.log('Analyzing input:', inputText);
        console.log('Context:', context);

        // Use the QLearning assistant to analyze the input
        const output = await assistants.QLearning(inputText, context);

        console.log('Analysis result:', output);

        res.json({
            response: output,
        });
    } catch (error) {
        console.error('Error during analysis:', error);
        res.status(500).json({ error: 'An error occurred during analysis.' });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});