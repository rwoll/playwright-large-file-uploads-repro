const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.get('/ready', (_req, res) => {
  res.send('OK');
});

app.get('/form', (_req, res) => {
    res.send(`
        <form action="/upload" method="POST" enctype="multipart/form-data">
            <label for="avatar">File</label>
            <input type="file"
                id="avatar"
                name="avatar"
                accept="*">
            <input type="submit">
        </form>
    `);
});

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.send(JSON.stringify({ size: req.file.size }));
})

app.listen(9999, () => {
  console.error(`Server listening…`)
});
