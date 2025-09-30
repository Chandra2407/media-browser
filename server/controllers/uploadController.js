const uploadController = async (req, res) => {
    try {
        const success = {
            message: "Upload successful",
            statusCode: 200
        }
        res.writeHead(200, { "Content-Type": "application/json" })
            .end(JSON.stringify(success))
    } catch (err) {
        const error = {
            message: "Upload failed",
            statusCode: 500
        }
        res.writeHead(500, { "Content-Type": "application/json" })
            .end(JSON.stringify(error))
    }
}

export default uploadController