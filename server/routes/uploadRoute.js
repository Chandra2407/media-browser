import uploadController from "../controllers/uploadController.js"

const uploadRoute = (req, res) => {
    if (req.method === 'POST') uploadController(req, res)
    else res.writeHead(404).end("Method not allowed")
}

export default uploadRoute