const http = require('http');

let healthy = true;

const server = http.createServer((req, res) => {
  if (req.url === '/kill') {
    healthy = false;
    res.writeHead(200);
    res.end('App will fail health checks now\n');
    return;
  }
  
  if (!healthy) {
    res.writeHead(500);
    res.end('Unhealthy\n');
    return;
  }
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello from Kubernetes!\n');
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});