import http from 'http';
import uploadRoute from './routes/uploadRoute.js';

const server = http.createServer((req, res) => {
    if (req.url === "/upload") return uploadRoute(req, res)
    res.writeHead(404);
    res.end("Not found");
})

server.listen(3000, () => {
    console.log('Server running on port 3000');
})