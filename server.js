const express = require('express');
const cors = require('cors');
const path = require('path');
const ytSearchHandler = require('./api/yt-search');
const ttsHandler = require('./api/tts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// API Routes
app.get('/api/yt-search', (req, res) => {
  ytSearchHandler(req, res);
});

app.get('/api/tts', (req, res) => {
  ttsHandler(req, res);
});

// Serve static assets
app.use(express.static(__dirname));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 CarPlay Multi-Screen Dashboard is running!`);
  console.log(`📡 Local:   http://localhost:${PORT}`);
  console.log(`🎵 YouTube: /api/yt-search`);
  console.log(`🗣️ TTS:     /api/tts`);
  console.log(`======================================================\n`);
});

