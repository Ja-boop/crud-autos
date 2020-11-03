require('dotenv').config()
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = process.env.PORT || 8080;

nunjucks.configure('src/module/views', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
    res.render('main.njk');
})

app.listen(port, () => {
    console.log(`Aplicacion escuchando en el puerto http://localhost:${port}/`);
});
