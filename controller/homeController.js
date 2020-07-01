const fs = require('fs');

const homeController = {
    db: './data/concesionarias.json',
    leerJSON: () => {
        let concesionariasJSON = fs.readFileSync(homeController.db, 'utf-8');
        return JSON.parse(concesionariasJSON);
    },
    home: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'})
        res.write('-----------------------------\nBienvenidos a Automotores DH.\n-----------------------------\n\n')
        res.write('Estas son nuestras sucursales\n-----------------------------\n\n\n');
        homeController.leerJSON().forEach((sucursal) => {
            res.write(`* ${sucursal.sucursal}\n\n`)
        });
        res.send();
    }
};


module.exports = homeController