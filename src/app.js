require('dotenv').config()
const express = require('express');
const nunjucks = require('nunjucks');

const configureDependecyInjection = require('./config/di'); 
const { init: initAgencyModule } = require('./module/agency/module')

const app = express();
const port = process.env.PORT || 8080;

app.use('/public', express.static('public'));

nunjucks.configure('src/module', {
    autoescape: true,
    express: app
});

const container = configureDependecyInjection(app);
app.use(container.get('Session'));

initAgencyModule(app, container);

const agencyController = container.get('AgencyController');
app.get('/', agencyController.index.bind(agencyController));

app.listen(port, () => {
    console.log(`Aplicacion escuchando en el puerto http://localhost:${port}/`);
});

