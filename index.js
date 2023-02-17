const express = require('express')
const app = express()
const { traerConductores, traerVehiculos, traerConductoresSinVehiculo } = require('./db.js')

app.get('/', function (req, res) {
  res.send('Ejercicio 2 ')
})

//RETORNA LA LISTA DE TODOS LOS CONDUCTORES
app.get('/conductores', async function (req, res) {
  let conductores = await traerConductores();
  if(!conductores){
    res.send('no existen conductores en la BD.')
  }else{
    let acumulador = "<ol>"
    conductores.forEach(conductor => {
      //console.log(conductor)
      acumulador+= `<li>${conductor.nombre}</li>`
    });
    acumulador+="</ol>"
    res.send(acumulador);
  }
  //res.send('RUTA CONDUCTORES')
})

//RETORNA LA LISTA DE TODOS LOS VEHICULOS
app.get('/vehiculos', async function(req, res) {
  traerVehiculos().then(vehiculos => {
      let acumulador = "<ol>"
      vehiculos.forEach(vehiculo => {
          console.log(vehiculo)
          acumulador+= `<li>${vehiculo.vehiculo}</li>`
      });
      acumulador+="</ol>"
      res.send(acumulador);

  }).catch(error => {
      res.send('no existen vehiculos en la BD.')
  })
})

app.get('/conductoressinauto', async function(req, res) {
  let edad = req.query.edad || 99;  //Si no hay nada es 99
  traerConductoresSinVehiculo(edad).then(listado => {
    if(listado.length == 0){  //ejemplo: ?edad=21
        return res.send(`<h1>No se encontraron usuarios sin autos con una edad inferior o igual a ${edad}</h1>`)
    }
    let acumulador = "<ol>"
    listado.forEach(conductor => {
        console.log(conductor )
        acumulador+= `<li>Nombre: ${conductor.nombre} - Edad: ${conductor.edad}</li>`
    });
    acumulador+="</ol>"
    res.send(acumulador);

  }).catch(error => {
      console.log(error)
      res.status(500).send("Error interno del servidor.");
  })
})

//SIN ECMASCcript6
// app.listen(3000, function(){
//   console.log("Servidor esuchando en http://localhost:3000")
// })
//CON ECMAScript6
app.listen(3000, () =>{
  console.log("Servidor esuchando en http://localhost:3000")
})