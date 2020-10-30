const express = require('express');
const app = express();
const PUERTO = 8080

app.listen(PUERTO, () => {
    console.log(`Aplicacion escuchando en el puerto ${PUERTO}`);
});
