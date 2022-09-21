const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8081;

app.get('/', (req, res) => {
    res.write('Hola Mundo');
})
.listen(() => {
    console.log(`Server running at port: ${port}`);
})