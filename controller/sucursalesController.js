const fs = require('fs');

const sucursalesController = {
    db: './data/concesionarias.json',
    leerJSON: () => {
        let concesionariasJSON = fs.readFileSync(sucursalesController.db, 'utf-8');
        return JSON.parse(concesionariasJSON);
    },
    sucursales: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'})
        res.write('-----------------------------\nEstas son nuestras sucursales\n-----------------------------\n\n\n');
        sucursalesController.leerJSON().forEach((sucursal) => {
            res.write(`* ${sucursal.sucursal}\n\n -Direccion: ${sucursal.direccion}\n -Telefono: ${sucursal.telefono}\n\n\n`)
        });
        res.send();
    },
    sucursal: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'})
        let id = req.params.sucursal;
        let concesionarias = sucursalesController.leerJSON();
        let sucursal;
        switch(id){
            case '3-de-febrero':
                sucursal = "3 de Febrero";
                break;
            case 'pilar':
                sucursal = "Pilar";
                break;
            case 'lanus':
                sucursal = "Lanus";
                break;
            case 'quilmes':
                sucursal = "Quilmes";
                break;
            case 'san-miguel':
                sucursal = "San Miguel";
                break;
            default:
                sucursal = 'error';
        };
        let concesionaria = concesionarias.filter((conce) => {
            if(conce.sucursal == sucursal){
                return conce;
            };
        });
        concesionaria = concesionaria[0];

        if(sucursal == 'error'){
            res.write('-------------------------------\nEsta sucursal no fue encontrada\n-------------------------------')
        }else{
            res.write(`-----------------------------\n  Sucursal: ${concesionaria.sucursal}. \n-----------------------------\n\n\n`);
            res.write(` -Dirección: ${concesionaria.direccion}\n -Teléfono: ${concesionaria.telefono}\n\n\n`);
            res.write('    -----------\n     VEHICULOS\n    -----------\n\n');
            concesionaria.autos.forEach((auto) => {
                res.write(`  -${auto.marca} ${auto.modelo} año ${auto.anio}.\n`)
            });
        }
        res.send();
    }
};


module.exports = sucursalesController