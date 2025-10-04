import { allowedTypes, API_URL } from "./config.js";

const form = document.getElementById("uploadForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = document.getElementById("file").files[0];
    if (!file) {
        alert("Please select a file!");
        return;
    }
    if (!allowedTypes.includes(file.type)) {
        alert("Only video or audio files are allowed!");
        return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: "POST",
            body: formData
        })
        const data = await response.json();
        alert("file uploaded");
    } catch (error) {
        console.error(error, "error uploading file");
    }
});