import uploadController from "../controllers/uploadController.js"

const uploadRoute = (req, res) => {
    if (req.method === 'POST') uploadController(req, res)
    else {
        const error = {
            message: "Mehtod not allowed",
            statusCode: 404
        }
        res.writeHead(404, { "Content-Type": "application/json" })
            .end(JSON.stringify(error))
    }
}

export default uploadRoute