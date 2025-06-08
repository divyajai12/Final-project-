const http = require('http');

// Set server hostname and port
const hostname = '0.0.0.0';
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200; // OK status
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from Node.js app running inside Docker!\n');
});

// Make the server listen on the specified hostname and port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});