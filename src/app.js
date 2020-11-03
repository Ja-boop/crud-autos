require('dotenv').config()
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = process.env.PORT || 8080;

nunjucks.configure('src/module/views/layout', {
    autoescape: true,
    express: app
});

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('home.njk', {
        github: "https://github.com/Ja-boop/crud-autos",
    });
})

app.listen(port, () => {
    console.log(`Aplicacion escuchando en el puerto http://localhost:${port}/`);
});
