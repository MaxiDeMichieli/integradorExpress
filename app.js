const express = require('express');
const app = express();

// RUTAS
let autos = require('./routes/autos');
let home = require('./routes/home');
let marcas = require('./routes/marcas');
let sucursales = require('./routes/sucursales');


app.use('/', home);

app.use('/sucursales', sucursales);

app.use('/marcas', marcas);

app.use('/autos', autos);


// ERROR
app.get('*', (req, res) => {
    res.status(404).send('404 not found. <br> Página no encontrada.')
});

// SERVIDOR LOCAL
app.listen(3030, () => console.log('Servidor corriendo en el puerto 3030.'))