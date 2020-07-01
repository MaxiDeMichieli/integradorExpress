const fs = require('fs');

const marcasController = {
    db: './data/concesionarias.json',
    leerJSON: () => {
        let concesionariasJSON = fs.readFileSync(marcasController.db, 'utf-8');
        return JSON.parse(concesionariasJSON);
    },
    marcas: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'})
        let autos = [];
        marcasController.leerJSON().forEach((sucursal) => {
            sucursal.autos.forEach((auto) => {
                autos.push(auto.marca);
            });
        });
        let marcas = [...new Set(autos)];
        marcas.sort();
        res.write('----------------------------------\nAutomotores DIGITAL HOUSE - FORMAR\n----------------------------------\n\n\n---------------\nNuestras marcas\n---------------\n\n');
        marcas.forEach((marca) => {
            res.write(`  - ${marca}\n`)
        });
        res.send();
    },
    marca: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'})
        let id = req.params.marca;
        let autos = [];
        marcasController.leerJSON().forEach((sucursal) => {
            sucursal.autos.forEach((auto) => {
                let datos = {marca: auto.marca, modelo: auto.modelo, anio: auto.anio};
                autos.push(datos);
            })
        });
        let autosFiltro = autos.filter((auto) => {
            if(auto.marca == id){
                return auto;
            }
        })
        res.write('----------------------------------\nAutomotores DIGITAL HOUSE - FORMAR\n----------------------------------\n\n\n')
        autosFiltro.forEach((auto) => {
            res.write(`* ${auto.marca} - ${auto.modelo} - ${auto.anio}\n`)
        })
        res.write(`\n\n----------------------------------\nTotal de autos encontrados: ${autosFiltro.length}\n----------------------------------`)
        res.send();
    }
};


module.exports = marcasController