import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Hostinger dynamically passes the PORT environment variable
const PORT = process.env.PORT || 3000;

// 1. Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// 2. Fallback rule: Send index.html for all other routes (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});