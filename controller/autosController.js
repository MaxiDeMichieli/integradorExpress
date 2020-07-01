const fs = require('fs');

const autosController = {
    db: './data/concesionarias.json',
    leerJSON: () => {
        let concesionariasJSON = fs.readFileSync(autosController.db, 'utf-8');
        return JSON.parse(concesionariasJSON);
    },
    autos: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'});
        res.write('----------------------------------\nAutomotores DIGITAL HOUSE - FORMAR\n----------------------------------\n\n--------------------\nTodos nuestros autos\n--------------------\n\n');
        let autos = [];
        autosController.leerJSON().forEach((sucursal) => {
            sucursal.autos.forEach((auto) => {
                let datos = {marca: auto.marca, modelo: auto.modelo, anio: auto.anio, color: auto.color};
                autos.push(datos);
            });
        });
        autos.forEach((auto) => {
            res.write(`   * ${auto.marca} - ${auto.modelo} - ${auto.anio} - ${auto.color}\n`)
        });
        res.write(`\n\n----------------------------------\nTotal de autos encontrados: ${autos.length}\n----------------------------------`)
        res.send();
    },
    marcaDato: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'});
        res.write('----------------------------------\nAutomotores DIGITAL HOUSE - FORMAR\n----------------------------------\n\n\n')
        let idMarca = req.params.marca;
        let idDato = req.params.dato;
        let autos = [];
        autosController.leerJSON().forEach((sucursal) => {
            sucursal.autos.forEach((auto) => {
                let datos = {sucursal: sucursal.sucursal, marca: auto.marca, modelo: auto.modelo, anio: auto.anio, color: auto.color};
                autos.push(datos);
            });
        });
        let autosMarca = autos.filter((auto) => {
            if(auto.marca == idMarca){
                return auto;
            }
        });
        let autosDato = autosMarca.filter((auto) => {
            if(auto.anio == idDato || auto.color == idDato){
                return auto;
            }
        })

        // logica de los id
        if(idDato == undefined){
            if(autosMarca.length == 0){
                res.write('No tenemos vehículos disponibles de esta marca')
            }else{
                autosMarca.forEach((auto) => {
                    res.write(`   * ${auto.marca} - ${auto.modelo} - ${auto.anio} - ${auto.color} -  SUCURSAL: ${auto.sucursal}\n\n`);
                });
                res.write(`\n\n----------------------------------\nTotal de autos encontrados: ${autosMarca.length}\n----------------------------------`);
            };
        }else{
            if(autosDato.length != 0){
                autosDato.forEach((auto) => {
                    res.write(`   * ${auto.marca} - ${auto.modelo} - ${auto.anio} - ${auto.color} -  SUCURSAL: ${auto.sucursal}\n\n`);
                });
                res.write(`\n\n----------------------------------\nTotal de autos encontrados: ${autosDato.length}\n----------------------------------`);
            }else{
                res.write(`No tenemos autos ${idMarca} de ese color o año`)
            };
        };
        res.send();
    }
};


module.exports = autosController