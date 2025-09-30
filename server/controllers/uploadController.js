const uploadController = async (req, res) => {
    try {
        res.writeHead(200);
        res.end('Upload Complete');
    } catch (err) {
        res.writeHead(500);
        res.end('Upload failed');
    }
}

export default uploadController