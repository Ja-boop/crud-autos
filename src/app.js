require('dotenv').config()
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = process.env.PORT || 8080;

nunjucks.configure('src/module', {
    autoescape: true,
    express: app
});

app.listen(port, () => {
    console.log(`Aplicacion escuchando en el puerto ${port}`);
});
