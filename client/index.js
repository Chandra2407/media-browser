import { API_URL } from "./config.js";

const form = document.getElementById("uploadForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = document.getElementById("file").files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: "POST",
            body: formData
        })
        const data = await response.json();
        console.log(data, "file uploaded");
    } catch (error) {
        console.error(error, "error uploading file");
    }
});