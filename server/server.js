import http from 'http';
import uploadRoute from './routes/uploadRoute.js';
import { ALLOWED_ORIGINS } from './config.js';

const server = http.createServer((req, res) => {
    // Enable CORS for all origins
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === "/upload") return uploadRoute(req, res)

    res.writeHead(404, { "Content-Type": "application/json" });
    const error = {
        message: "Route not found",
        statusCode: 404
    }
    res.end(JSON.stringify(error));
})

server.listen(3000, () => {
    console.log('Server running on port 3000');
})