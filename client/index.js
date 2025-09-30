const uploadBtn = document.getElementById('upload')

uploadBtn.addEventListener('click', () => {
    const input = document.getElementById('file')
    console.log(input.files)
})