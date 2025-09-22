Node.js Media Server

A full-stack Node.js media server that allows users to upload, stream, and manage video/audio files in real-time, demonstrating Node.js features like streams, buffers, events, pipes, file system operations, libuv thread pool, and network I/O.

--------------------------------------------------------------------------------

Features

Upload video and audio files via browser

Stream video/audio files in-browser using <video> and <audio>

Real-time upload progress and file updates using Server-Sent Events (SSE)

Automatic compression of uploaded files using zlib (libuv thread pool)

Tabbed UI to separate Video and Audio files

Live updates for newly uploaded files from any user

--------------------------------------------------------------------------------

System Design

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
 Routes        Controllers    Services
   │             │             │
   └─────────────┴─────────────┘
                │
           Event Bus (EventEmitter)
                │
                ▼
           /media/ folder

--------------------------------------------------------------------------------

Folder Structure
media-server/
│
├── server.js                 # Entry point
├── package.json
├── README.md
│
├── routes/                   # All routes delegate to controllers
│   ├── uploadRoute.js
│   ├── streamRoute.js
│   ├── eventsRoute.js
│   └── fileRoute.js
│
├── controllers/              # Controllers handle route logic
│   ├── uploadController.js
│   ├── streamController.js
│   ├── eventsController.js
│   └── fileController.js
│
├── services/                 # Business logic / utilities
│   ├── fileService.js
│   ├── compressionService.js
│   └── watcherService.js
│
├── events/                   # EventEmitter for backend events
│   └── eventBus.js
│
├── media/                    # Uploaded files stored here
│
└── client/                   # Frontend UI
    └── index.html

--------------------------------------------------------------------------------

Frontend Features

Upload button at the top

Tabbed file list for Video / Audio files

Click a file to play in <video> or <audio> player

Real-time updates for new uploads using SSE

--------------------------------------------------------------------------------

Backend Features

All routes pass through controllers → then call services

Handles file upload via streams

Streams files using chunked streaming and Range headers

Emits events using EventEmitter for upload progress and new files

Compresses files asynchronously using zlib (libuv thread pool)

Watches /media/ folder for newly added files

--------------------------------------------------------------------------------

API Endpoints
Method	Endpoint	Controller	Description
POST	/upload	uploadController	Upload video/audio file
GET	/video?file=xyz	streamController	Stream requested file
GET	/files	fileController	Get list of uploaded files
GET	/events	eventsController	SSE for live updates

SSE Data Format:

data: video:movie1.mp4
data: audio:song1.mp3

--------------------------------------------------------------------------------

Setup & Run
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

--------------------------------------------------------

Tech Stack

Backend: Node.js (http, fs, streams, events, zlib)

Frontend: HTML, CSS, JS (Vanilla)

Communication: HTTP + Server-Sent Events (SSE)

Storage: Local disk (/media/)

--------------------------------------------------------

Scalability & Limitations

Number of files limited by disk space and filesystem

Multiple concurrent streams depend on server bandwidth

Production-ready: Use cloud storage (AWS S3 / GCS) and load balancer

SSE can be replaced with WebSockets for interactive multi-user features

--------------------------------------------------------

Notes

Supports video formats: .mp4, .mov, .mkv, .webm

Supports audio formats: .mp3, .wav, .ogg

Browser must support <video> / <audio> streaming

