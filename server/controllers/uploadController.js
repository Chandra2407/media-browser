import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import Busboy from "busboy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadController = (req, res) => {
    try {
        // Save inside server/media
        let mediaDir = path.join(__dirname, "..", "media");
        if (!fs.existsSync(mediaDir)) {
            fs.mkdirSync(mediaDir, { recursive: true });
        }

        const busboy = Busboy({ headers: req.headers });
        let result;

        busboy.on("file", (fieldname, file, info) => {
            const { filename, encoding, mimeType } = info;
            const isVideo = mimeType.split("/")[0] === "video";
            const isAudio = mimeType.split("/")[0] === "audio";
            if (!isVideo && !isAudio) {
                const error = {
                    message: "Only video or audio files are allowed",
                    statusCode: 400,
                };
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify(error));
                return;
            }
            if (isVideo) {
                mediaDir = path.join(mediaDir, "videos");
            } else if (isAudio) {
                mediaDir = path.join(mediaDir, "audios");
            }
            const filePath = path.join(mediaDir, filename);
            const writeStream = fs.createWriteStream(filePath);
            file.pipe(writeStream);

            file.on("end", () => {
                result = { fieldname, filename, encoding, mimeType, path: filePath };
            });
        });

        busboy.on("finish", () => {
            const success = {
                data: result,
                message: "Upload successful",
                statusCode: 200,
            };
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(success));
        });
        req.pipe(busboy);
    } catch (err) {
        const error = {
            message: "Upload failed",
            error: err.message,
            statusCode: 500,
        };
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(error));
    }
};

export default uploadController;
