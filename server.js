const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || config.dev.port;
const HOST = config.dev.host;

// Serve static files from build directory
app.use(express.static(path.join(__dirname, config.paths.build)));

// Handle all routes - serve index.html for SPA-like behavior
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, config.paths.build, 'index.html'));
// });

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
  console.log(`📝 Serving: ${config.site.title}`);
  console.log(`📁 Directory: ${config.paths.build}`);
});