🎬 Node.js Media Server

A full-stack Node.js media server that allows users to upload, stream, and manage video/audio files in real-time, demonstrating Node.js features like streams, buffers, events, pipes, file system operations, libuv thread pool, and network I/O.

📌 Features

Upload video and audio files via browser

Stream video/audio files in-browser using <video> and <audio>

Real-time upload progress and file updates using Server-Sent Events (SSE)

Automatically compress uploaded files using zlib (libuv thread pool)

Tabbed UI to separate Video and Audio files

Live updates for newly uploaded files from any user

🏗 System Design
High-Level Architecture
          ┌───────────────┐
          │   Browser     │
          │  (Frontend)   │
          └─────┬─────────┘
                │ HTTP / SSE
          ┌─────▼─────────┐
          │ Node.js Server │
          │  (Backend)    │
          └─────┬─────────┘
   ┌─────────────┼─────────────┐
   │             │             │
File Upload   File Streaming  Event Bus
(stream/buffer)   (fs streams) (EventEmitter)
   │             │             │
   ▼             ▼             ▼
 /media/       /media/       Compression Service
(directory)   (directory)   (zlib, libuv pool)


🗂 Folder Structure
media-server/
│
├── server.js                 # Entry point for backend
├── package.json              # Node.js project metadata
├── README.md                 # Project documentation
│
├── routes/                   # HTTP routes
│   ├── uploadRoute.js        # POST /upload
│   ├── streamRoute.js        # GET /video
│   ├── eventsRoute.js        # GET /events (SSE)
│   └── fileRoute.js          # GET /files
│
├── controllers/              # Orchestrates logic for routes
│   ├── uploadController.js
│   ├── streamController.js
│   └── eventsController.js
│
├── services/                 # Business logic / utilities
│   ├── fileService.js
│   ├── compressionService.js
│   └── watcherService.js
│
├── events/                   # EventEmitter for backend events
│   └── eventBus.js
│
├── media/                    # Uploaded audio/video files
│   └── sample.mp4            # Example file
│
├── client/                   # Frontend UI
│   └── index.html            # Main HTML page
│
└── .gitignore                # Optional: ignore node_modules, media/

🖥 Frontend Features

Upload button at top

Tabbed file list (Video / Audio)

Click file to play in <video> or <audio> player

Real-time updates for new uploads from other users

🌐 Backend Features

Handles file upload via streams

Serves files using chunked streaming with Range headers

Emits events for upload progress, completion, and new files

Compresses files using zlib without blocking main thread

Watches /media/ folder for newly added files

📂 File Storage & Streaming

Files stored in /media/ directory on server

Streamed in chunks using fs.createReadStream()

Compression handled by zlib (libuv thread pool)

File watcher (fs.watch) triggers frontend updates

🌐 API Endpoints
Method	Endpoint	Description
POST	/upload	Upload video/audio file
GET	/video?file=xyz	Stream requested file
GET	/files	Get list of uploaded files
GET	/events	SSE for live updates

SSE Data Format:

data: video:movie1.mp4
data: audio:song1.mp3

⚙ Setup & Run
# 1. Clone repository
git clone <repo-url>
cd media-server

# 2. Install dependencies
npm init -y

# 3. Create folders if not already
mkdir media client routes controllers services events

# 4. Start server
node server.js

# 5. Open frontend
open client/index.html  # Or open in browser manually

🛠 Tech Stack

Backend: Node.js (http, fs, streams, events, zlib)

Frontend: HTML, CSS, JS (Vanilla)

Communication: HTTP + Server-Sent Events (SSE)

Storage: Local disk (/media/)

Optional: Compression via libuv thread pool

⚖ Scalability & Limitations

Number of files limited by disk space and filesystem

Multiple concurrent streams depend on server bandwidth

Production-ready: Use cloud storage (AWS S3 / GCS) and load balancer

SSE can be replaced with WebSockets for interactive multi-user features

✅ Notes

Organize files in subfolders if storing a large number of files

Supports video formats: .mp4, .mov, .mkv, .webm

Supports audio formats: .mp3, .wav, .ogg

Browser must support <video> / <audio> streaming